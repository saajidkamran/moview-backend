const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const findOrCreate = require('mongoose-findorcreate');

const CLIENT_ID="193342951489-73rn7brgo1eb78ug422cnal1bhstg71c.apps.googleusercontent.com";
const CLIENT_SECRETS ="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"; 

const GIT_CLIENT_ID="6387519c341c0b5b226f";
const GIT_CLIENT_SECRETS ="aa25ddfc75c98e9b1229cdae6096bb38230edb34";

mongoose.connect('mongodb://localhost:27017/moviewDB');

const moviewSchema = {
    title: String,
    content: String,
};
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId:String,
    name:String
}); 

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

const User = mongoose.model('User', UserSchema);
const moview = mongoose.model('moview', moviewSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
    new GoogleStrategy(
        {
            clientID:CLIENT_ID,
            clientSecret: CLIENT_SECRETS,
            callbackURL: 'http://localhost:3000/auth/google/calback',
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log("profile",profile)
            User.findOrCreate({ googleId: profile.id , name:profile.displayName}, function (err, user) {
                return cb(err, user);
            });
        },  
    ),
);

passport.use(new GitHubStrategy({
    clientID: GIT_CLIENT_ID,
    clientSecret: GIT_CLIENT_SECRETS,
    callbackURL: "http://localhost:3000/auth/github/calback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = { moview, User };
