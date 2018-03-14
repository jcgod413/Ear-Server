const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User, Translator } = require('../data');
const { JWT_TOKEN } = require('../config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer'),
  secretOrKey: JWT_TOKEN,
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new JwtStrategy(opts, (payload, done) => {
  console.log(payload);
  if (payload.translatorId !== undefined) {
    // translator
    Translator
      .findOne({
        where: { id: payload.translatorId },
      })
      .catch((err) => {
        done(err, false);
      })
      .then((translator) => {
        if (!translator) return done(null, false);
        done(null, { translatorId: translator.id });
      });
  } else if (payload.id !== undefined) {
    // common user
    User
    .findOne({
      where: { id: payload.id },
    })
    .catch((err) => {
      done(err, false);
    })
    .then((user) => {
      if (!user) return done(null, false);
      done(null, { id: user.id });
    });
  } else {
    done(null, false);
  }
}));

module.exports = passport;
