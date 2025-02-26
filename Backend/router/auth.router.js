import express from "express";
import passport from "passport";

const router = express.Router();

router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }) // Request user email scope
);

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }), // Redirect to login on failure
    (req, res) => {
        // Successful authentication, redirect to the desired page
        res.redirect('/');
    }
);

router.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user); // Send user profile data to frontend
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

export default router;