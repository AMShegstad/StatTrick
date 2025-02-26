import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password, email, favorite_team } = req.body;
  console.log('Received registration request with data:', { username, password, email, favorite_team });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      favorite_team: favorite_team,
    });

    console.log(newUser);

    console.log('User created successfully:', newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user', details: error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ error: 'JWT secret key is not defined' });
    }
    const token = jwt.sign({ id: user.id, username: user.username, favoriteTeam: user.favorite_team }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    return res.json({ token, favoriteTeam: user.favorite_team });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to login' });
  }
});

export default router;