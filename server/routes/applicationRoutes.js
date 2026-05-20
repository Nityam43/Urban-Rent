import express from 'express';
import {
    createApplication,
    getMyApplications,
    respondToApplication,
    withdrawApplication,
    waitlistApplication,
} from '../controllers/applicationController.js';

import { authenticateUser, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Tenant creates an application
router.post('/', authenticateUser, requireRole('tenant'), createApplication);

// Get my applications (works for both tenant and manager)
router.get('/my', authenticateUser, getMyApplications);

// Manager responds to an application
router.patch('/:id/respond', authenticateUser, requireRole('manager'), respondToApplication);

// Tenant withdraws an application
router.patch('/:id/withdraw', authenticateUser, requireRole('tenant'), withdrawApplication);

// Manager puts an applicant on the waitlist
router.patch('/:id/waitlist', authenticateUser, requireRole('manager'), waitlistApplication);



export default router;
