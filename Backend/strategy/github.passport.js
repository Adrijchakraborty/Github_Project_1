import passport from "passport";
import strategy from "passport-github2";
import dotenv from "dotenv";

dotenv.config();

const GitHubStrategy = strategy.Strategy
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET, 
    callbackURL: 'http://localhost:3000/auth/github/callback'
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));