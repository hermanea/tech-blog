const express = require('express');
const router = express.Router();

const userRoutes = require('./userController');
router.use("/api/users",userRoutes);

const weblogRoutes = require('./weblogController');
router.use("/api/blogPosts",blogPostrRoutes);

const userRoutes = require('./commentController');
router.use("/api/comments",commentRoutes);

const userRoutes = require('./frontEndController');
router.use("/",frontEndRoutes);

module.exports = router;