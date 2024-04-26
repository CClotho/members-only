const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User")
const Account = require("../models/Account")
const Role = require("../models/Role")
const bcrypt= require('bcryptjs');

// Create a module for setting up this strategy and export it by module-export = {passport};
// then call passport.authenticate('local') on every route that needs authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("the password", password)
      
      const account = await Account.findOne({ username: username });
      
      if (!account) {
        return done(null, false, { message: "Incorrect username" });
      };

      const match = await bcrypt.compare(password, account.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
      }

      const user = await User.findOne({user: account._id})
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);


passport.serializeUser((user, done) => {
  // after local strategy verification passport attach the user's id to the req.session.user
 return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  // when a request is made from the browser it will call this 
  //and check if this user exist then use the data from this user
  // for the subsequent requests to the server
  try {
    const user = await User.findOne({_id:id})



  return done(null, user);
  } catch(err) {
  return  done(err);
  };
});


module.exports = passport;