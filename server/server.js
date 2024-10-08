import express from "express";
import cors from "cors";
import "dotenv/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pg from "pg";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import session from "express-session";


const port = process.env.PORT || 5000;
const app = express();

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect(function (err) {
  err
    ? console.log("Error connecting database: " + err)
    : console.log("Database connected!");
});

// Example secret key, replace with your actual secret key
const SECRET_KEY = process.env.SECRET_KEY;

// Function to generate a token with expiration time
const generateToken = (user) => {
  return jwt.sign({ username: user.username, id: user.id }, SECRET_KEY, {
    expiresIn: "1h", // Token expires in 1 sec
  });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: "https://resume-creator-client.vercel.app", // Allow requests from React app "http://localhost:3000"
  credentials: true
}));
app.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const saltRounds = 10;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback", // "https://resume-creator-server.vercel.app/auth/google/callback"
  scope: ["profile", "email"]
},
  async (token, tokenSecret, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let userResult = await db.query("SELECT * FROM resume_users WHERE google_id = $1", [profile.id]);
      if (userResult.rows.length === 0) {
        userResult = await db.query("INSERT INTO resume_users (username, google_id) VALUES ($1, $2) RETURNING *", [email, profile.id]);
      };

      const user = userResult.rows[0];
      console.log("GOOGLE USER : ", user);
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) =>{
  try {
    const userResult = await db.query("SELECT * FROM resume_users WHERE user_id = $1", [id]);
    done(null, userResult.rows[0]);
  } catch (error) {
    done(error, null);
  }
});


//API registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await db.query(
      "SELECT * FROM resume_users WHERE username = $1",
      [username]
    );

    if (userResult.rows.length > 0) {
      console.log("Username already exists. Try another one.");
      return res.status(400).send("Username already exists. Try another one.");
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error hashing password", err);
        return res.status(500).send("Error registering user");
      }

      const newUserResult = await db.query(
        "INSERT INTO resume_users (username, password) VALUES ($1, $2) RETURNING *",
        [username, hash]
      );

      const newUser = newUserResult.rows[0];
      console.log("REGISTERED : ", newUser)

      if (!newUser) {
        console.error("Error creating new user");
        return res.status(500).send("Error registering user");
      }

      const token = generateToken(newUser);
      return res.json({ token });
    });
  } catch (error) {
    console.error("Error during registering ", error);
    res.status(500).send("Error registering user");
  }
});

//API login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("ROUTE HIT", username); // DEBUG TO LOGIN ROUTE

  try {
    const userResult = await db.query(
      "SELECT * FROM resume_users WHERE username = $1",
      [username]
    );
    console.log("FETCHED USER FROM DB", userResult.rows[0]) // DEBUG TO GET USER FOR LOGIN
    if (userResult.rows.length === 0) {
      console.log("User not found");
      return res.status(400).send("User not found");
    }

    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("CHECKING PASSWORD VALIDATION", validPassword); // DEBUG TO VALIDATE PASSWORD FOR LOGIN

    if (!validPassword) {
      console.log("Invalid password.");
      return res.status(400).send("Invalid password");
    }

    const token = generateToken(user);
    console.log("GENERATED TOKEN FOR THE USER", token); // DEBUG TO CHECK IF THE TOKEN IS CREATED FOR THE USER
    return res.json({ token });

    // db.end();
  } catch (error) {
    console.error("Error during login", error);
    return res.status(500).send("Error logging in");
  }
});

//API Check if logged in
app.get("/check-login", authenticateToken, (req, res) => {
  return res.json({ loggedIn: true, user: req.user });
});

//API Fetch user data
app.get("/user-data", authenticateToken, async (req, res) => {
  try {
    const userResult = await db.query(
      "SELECT * FROM resume_users_data WHERE user_id = $1",
      [req.user.id]
    );
    if (userResult.rows.length > 0) {
      return res.json(userResult.rows[0]); // send user data
      console.log(userResult.rows[0], "DATA FROM DB");
    } else {
      return res.status(404).send("No data found");
    }
    // db.end();
  } catch (error) {
    console.error("Error fetching data", error);
    return res.status(500).send("Error fetching data");
  }
});


//API save user data
app.post("/save-data", authenticateToken, async (req, res) => {
  const { data } = req.body;
  try {
    await db.query(
      "INSERT INTO resume_users_data (user_id, fullname, email, phone_number, address, education, experience, skills) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        req.user.id,
        data.fullname,
        data.email,
        data.phone_number,
        data.address,
        data.education,
        data.experience,
        data.skills,
      ]
    );
    return res.send("Data saved");

    // db.end();
  } catch (error) {
    console.error("Error saving user data", error);
    return res.status(500).send("Error saving user data");
  }
});

//API update user data
app.put("/update-data", authenticateToken, async (req, res) => {
  const { data } = req.body;
  try {
    await db.query(
      "UPDATE resume_users_data SET fullname = $1, email = $2, phone_number = $3, address = $4, education = $5, experience = $6, skills = $7 WHERE user_id = $8",
      [
        data.fullname,
        data.email,
        data.phone_number,
        data.address,
        data.education,
        data.experience,
        data.skills,
        req.user.id,
      ]
    );
    return res.send("Data updated");

    // db.end();
  } catch (error) {
    console.error("Error updating user data", error);
    return res.status(500).send("Error updating user data");
  }
});

app.get("/auth/google", 
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback", 
  passport.authenticate("google", {failureRedirect: "/"}),
  (req, res) => {
    const token = generateToken(req.user);
    return res.redirect(`http://localhost:3000/login-success?token=${token}`); // `https://resume-creator-client.vercel.app/login-success?token=${token}`
  }
);


app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
