const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Announcement routes
router.post('/announcementinsert', announcementController.announcementInsert);
router.post('/announcementupdate', announcementController.announcementUpdate);
router.post('/announcementdelete', announcementController.announcementDelete);
router.post('/announcementfind', announcementController.announcementFind);

module.exports = router;