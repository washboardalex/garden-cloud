import { redisClient } from './signin';

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }
  return redisClient.get(authorization, (err, reply) => {
    console.log(authorization);
    console.log('here it is');
    if (err || !reply) {
        console.log('dang')
        console.error(err)
        console.error(reply)
        return res.status(401).send('Unauthorized');
    }
    return next();
  });
};

export default requireAuth;