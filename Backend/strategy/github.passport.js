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
    clientID: process.env.CLIENT_ID, // Replace with your GitHub Client ID
    clientSecret: process.env.CLIENT_SECRET, // Replace with your GitHub Client Secret
    callbackURL: 'https://github-project-1-frontend.onrender.com/auth/github/callback' // Match the callback URL from Step 1
},
    function (accessToken, refreshToken, profile, done) {
        // This function is called after successful authentication
        // You can save the user profile or perform other actions here
        // console.log(profile);
        return done(null, profile);
    }));