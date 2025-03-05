import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
});

// GET /users/:id - Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /users - Create a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
  const { username, email, password, favorite_team} = req.body;
  // Check if user exists before creation
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  const newUser = await User.create({
     username, 
     email, 
     password: hashedPassword, 
     favorite_team  });
    
     res.status(201).json(newUser);
     console.log('User created successfully:', newUser);

  } catch (error: any) {
    
    res.status(400).json({ message: error.message });
  }
});

// POST /users/login - Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // **Find user by email**
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
    }

    // **Compare password with hashed password**
    const isPasswordValid = await bcrypt.compare(password, user!.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
    }

    // **Ensure JWT secret is set**
    if (!process.env.JWT_SECRET_KEY) {
      console.error('❌ Missing JWT_SECRET_KEY in environment variables.');
      res.status(500).json({ error: 'Internal server error' });
    }

    // **Ensure JWT secret is set**
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      console.error('❌ Missing JWT_SECRET_KEY in environment variables.');
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // **Generate JWT**
    const token = jwt.sign(
      { id: user!.id, username: user!.username, favorite_team: user!.favorite_team },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, favorite_team: user!.favorite_team });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /users/:id - Update a user by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userRouter };
