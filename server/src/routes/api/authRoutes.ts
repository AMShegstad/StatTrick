/* eslint-disable no-undef */
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.js"; // Adjust the import based on your project structure
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const router = Router();

interface RegisterRequestBody {
  username: string;
  password: string;
  email: string;
  favoriteTeam: string;
}

interface LoginRequestBody {
  username: string;
  password: string;
}

router.post("/register", async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  const { username, password, email, favoriteTeam } = req.body;
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      favoriteTeam,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({ error: "Failed to create new user" });
  }
});

router.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY || 'default_secret_key',
      { expiresIn: '1h' }
    );
    res.json({ token, username: user.username, favoriteTeam: user.favoriteTeam });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Failed to log in user' });
  }
});

export default router;
