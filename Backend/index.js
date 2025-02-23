import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import "./strategy/github.passport.js"

const app = express();

// app.use(cors());
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 5000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }) // Request user email scope
);

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }), // Redirect to login on failure
    (req, res) => {
        // Successful authentication, redirect to the desired page
        res.redirect('/');
    }
);

app.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user); // Send user profile data to frontend
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});



app.listen(port, () => {
    console.log(`listening on ${port}`);
})