import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import "./strategy/github.passport.js"

import authRouter from "./router/auth,router.js"

const app = express();

// app.use(cors());
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 5000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(authRouter);



app.listen(port, () => {
    console.log(`listening on ${port}`);
})