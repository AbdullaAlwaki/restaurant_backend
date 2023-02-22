import passportJWT from 'passport-jwt';
import User from '../models/user.models.js';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const configureJwtStrategy = (passport) => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: (req) => req.cookies.access_token,
        secretOrKey: process.env.SECRET,
      },
      (jwtPayload, done) => {
        return User.findById(jwtPayload.id)

          .select('_id')
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => done(err));
      }
    )
  );
};

export default configureJwtStrategy;
