const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');

// Opportunity routes
router.post('/opportunityinsert', opportunityController.opportunityInsert);
router.post('/opportunityupdate', opportunityController.opportunityUpdate);
router.post('/opportunitydelete', opportunityController.opportunityDelete);
router.post('/opportunityfind', opportunityController.opportunityFind);

module.exports = router;