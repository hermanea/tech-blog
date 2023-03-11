const express = require("express");
const router = express.Router();

const weblogRoutes = require("./weblogController");
router.use("/api/weblogs", weblogRoutes);

const userRoutes = require("./userController");
router.use("/api/users", userRoutes);

const frontEndRoutes = require("./frontEndController");
router.use("/", frontEndRoutes);

const commentRoutes = require("./commentController");
router.use("/api/comments", commentRoutes);

module.exports = router;