import express from 'express';
import { createUser, getUserByFirebaseUid } from '../controllers/userController';

const router = express.Router();

router.post('/users', createUser);
router.get('/users/:firebaseUid', getUserByFirebaseUid);

export default router; 