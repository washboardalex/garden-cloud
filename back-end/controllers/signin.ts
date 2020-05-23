import jwt from 'jsonwebtoken';
import redis from 'redis';

// update host to correct address for prod
export const redisClient = redis.createClient(process.env.REDIS_URI);

const signToken = (username) => {
  const jwtPayload = { username };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days'});
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
        console.log('SHIIIIIIIIIT M8')
        console.log(token)
        redisClient.get(token, function(err, reply) { 
            if (err || !reply) {
                console.log('FUUUUUARRRRRKK')
            } else {
                console.log('mmmyyawaaaaaaaaattee')
                console.log(reply)
            }
        }) 
        return { success: 'true', userId: id, token, user }
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
          .then(user => {
            
            user = user[0];
            const { joined, ...userNoJoined } = user;
            const { garden_length, garden_width, ...userNoGardenBeds } = userNoJoined;

            user = { 
              ...userNoGardenBeds, 
              gardenLength: parseFloat(garden_length),  
              gardenWidth: parseFloat(garden_width),
            }

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