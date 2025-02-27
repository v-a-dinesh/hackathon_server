const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Event routes
router.post('/eventinsert', eventController.eventInsert);
router.post('/eventupdate', eventController.eventUpdate);
router.post('/eventdelete', eventController.eventDelete);
router.post('/eventfind', eventController.eventFind);

module.exports = router;