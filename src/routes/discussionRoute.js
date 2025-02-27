const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

// Discussion routes
router.post('/discussioninsert', discussionController.discussionInsert);
router.post('/discussionupdate', discussionController.discussionUpdate);
router.post('/discussiondelete', discussionController.discussionDelete);
router.post('/discussionfind', discussionController.discussionFind);

module.exports = router;