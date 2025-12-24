const express = require('express');
const { createOpportunity, getAllOpportunities, getOpportunityById, updateOpportunity, deleteOpportunity } = require('../controllers/OpportunityController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')
const router = express.Router();

// /api/opportunities
router.post('/', authMiddleware, roleMiddleware, createOpportunity);

// /api/opportunities
router.get('/', authMiddleware, roleMiddleware, getAllOpportunities);
// /api/opportunities/:id
router.get('/:_id', authMiddleware, roleMiddleware, getOpportunityById);

// /api/opportunities/:id
router.put('/:id', authMiddleware, roleMiddleware, updateOpportunity);

// /api/opportunities/:id
router.delete('/:', authMiddleware, roleMiddleware, deleteOpportunity);

module.exports = router;