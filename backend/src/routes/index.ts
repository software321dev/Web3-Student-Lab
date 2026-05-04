import { Router } from 'express';
import feedbackRouter from '../feedback/feedback.routes.js';
import userRouter from '../user/routes.js';
import authRoutes from './auth/auth.routes.js';
import certificatesRouter from './certificates.routes.js';
import learningRoutes from './learning/learning.routes.js';
import studentsRouter from './students.js';
import healthRouter from './health.routes.js';

const router = Router();

router.use('/health', healthRouter);
router.use('/students', studentsRouter);
router.use('/certificates', certificatesRouter);
router.use('/feedback', feedbackRouter);
router.use('/auth', authRoutes);
router.use('/learning', learningRoutes);
router.use('/user', userRouter);

export default router;
