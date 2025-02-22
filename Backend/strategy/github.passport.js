import passport from "passport";
import strategy from "passport-github2";

const GitHubStrategy = strategy.Strategy
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


export default passport.use(new GitHubStrategy({
    clientID: 'your-github-client-id', // Replace with your GitHub Client ID
    clientSecret: 'your-github-client-secret', // Replace with your GitHub Client Secret
    callbackURL: 'http://localhost:3000/auth/github/callback' // Match the callback URL from Step 1
},
    function (accessToken, refreshToken, profile, done) {
        // This function is called after successful authentication
        // You can save the user profile or perform other actions here
        return done(null, profile);
    }));