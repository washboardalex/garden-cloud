import jwt from 'jsonwebtoken';
import redis from 'redis';

// update host to correct address for prod
export const redisClient = redis.createClient(process.env.REDIS_URI);

const signToken = (username) => {
  const jwtPayload = { username };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days'});
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

export const createSession = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
        return { success: 'true', token, user }
    })
    .catch(console.log);
};

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(userData => {

            let { joined, ...user } = userData[0];
            return user;

          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        return Promise.reject('wrong credentials');
      }
    })
    .catch(err => err)
}

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).send('Unauthorized');
    }
    return res.json({userId: reply})
  });
}

export const signinAuthentication = (db, bcrypt) => (req, res) => {
    const { authorization } = req.headers;
    return authorization 
        ? getAuthTokenId(req, res)
        : handleSignin(db, bcrypt, req, res)
            .then(data =>
                data.id && data.email 
                    ? createSession(data) 
                    : Promise.reject(data)
            )
            .then(session => 
                res.json(session)
            )
            .catch(err => 
                res.status(400).json(err)
            );
}