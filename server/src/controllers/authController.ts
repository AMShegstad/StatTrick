import { Request, Response } from 'express';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET_KEY is not defined in environment variables.");
}

// Register a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, favorite_team } = req.body;

    // Check if required fields are provided
    if (!username || !email || !password || !favorite_team) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      favorite_team
    });

    console.log('✅ User created successfully:', newUser);
    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error: any) {
    console.error('❌ Error creating user:', error);
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if both fields are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, favoriteTeam: user.favorite_team },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`✅ ${username} logged in successfully.`);
    return res.json({ message: 'Login successful', token, favoriteTeam: user.favorite_team });
  } catch (error: any) {
    console.error('❌ Error logging in:', error);
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
