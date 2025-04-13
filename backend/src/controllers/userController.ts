import { Request, Response } from 'express';
import { User } from '../models/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, firebaseUid } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      firebaseUid,
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const getUserByFirebaseUid = async (req: Request, res: Response) => {
  try {
    const { firebaseUid } = req.params;
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
}; 