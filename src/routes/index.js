const express = require("express")
const authRoute = require("./authRoutes")
const clubRoute = require("./clubRoute");
const announcementRoute = require("./announcementRoute");
const eventRoute = require("./eventRoute");
const opportunityRoute = require("./opportunityRoute");
const discussionRoute = require("./discussionRoute");

const router = express.Router()

router.use("/auth", authRoute);
router.use("/club", clubRoute);
router.use("/announcement", announcementRoute);
router.use("/event", eventRoute);
router.use("/opportunity", opportunityRoute);
router.use("/discussion", discussionRoute);

module.exports = router;