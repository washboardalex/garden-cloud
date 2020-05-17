import { redisClient } from './signin';

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('in requireAuth middleware function');
  console.log('authorization header submitted');
  console.log('authorization is : ');
  console.log(authorization);
  if (!authorization) {
    // return next()
    console.log('rejected, no authorization boiii');
    return res.status(401).send('Unauthorized');
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      console.log('rejected, redis client errored out or no reply');
      console.log('error is : ');
      console.log(err);
      // return next()
      return res.status(401).send('Unauthorized');
    }
    console.log('all is well, returning next in middleware')
    return next();
  });
};

export default requireAuth;