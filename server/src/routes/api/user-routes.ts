import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../../controllers/userController.js';
import { createUser } from '../../controllers/authController.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get a user by id
router.get('/:id', getUserById);

// POST /users - Create a new user
router.post('/', createUser);

// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user by id
router.delete('/:id', deleteUser);

export { router as userRouter };
