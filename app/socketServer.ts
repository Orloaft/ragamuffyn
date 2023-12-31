import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

const app = express();

app.use(
  session({ secret: "your_secret", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport strategies for Google and GitHub
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      // Handle user profile
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      // Handle user profile
    }
  )
);

// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ... other Express/Remix server setup

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow connections from localhost:3000
    methods: ["GET", "POST"], // Allow GET and POST methods
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  // Handle your events here
});

// Other express and Remix setup...

server.listen(8080, () => {
  console.log("listening on *:8080");
});
