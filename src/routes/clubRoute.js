const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

// Club routes
router.post('/clubinsert', clubController.clubInsert);  // Changed from '/create'
router.post('/clubupdate', clubController.clubUpdate);  // Changed from '/update'
router.post('/clubdelete', clubController.clubDelete);  // Changed from '/delete'
router.post('/clubfind', clubController.clubFind);      // Changed from '/find'

module.exports = router;