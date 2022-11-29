import express from "express";
import dotenv from "dotenv";
import { envs, Client } from "stytch";
import cors from "cors";

dotenv.config();

const app = express();

const client = new Client({
  project_id: process.env.PROJECT_ID,
  secret: process.env.SECRET,
  env: envs.test,
});

const port = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await client.passwords.create({
      email,
      password,
      session_duration_minutes: 60,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      token: userData.session_token,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.error_message,
      err: error,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await client.passwords.authenticate({
      email,
      password,
      session_duration_minutes: 60,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: userData.session_token,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.error_message,
      err: error,
    });
  }
});

app.post("/authenticate", async (req, res) => {
  const { session_token } = req.body;

  try {
    await client.sessions.authenticate({
      session_token,
    });

    res.status(200).json({
      success: true,
      message: "Token is valid",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.error_message,
      err: error,
    });
  }
});

app.post("/logout", async (req, res) => {
  const { session_token } = req.body;

  try {
    await client.sessions.revoke({
      session_token,
    });

    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.error_message,
      err: error,
    });
  }
});

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`)
// })

app.listen(port, () => console.log(`Server running on port ${port}`));
