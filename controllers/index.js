const express = require('express');
const router = express.Router();

const userRoutes = require('./userController');
router.use("/api/users",userRoutes);

const weblogRoutes = require('./weblogController');
router.use("/api/weblogs",weblogRoutes);

const commentRoutes = require('./commentController');
router.use("/api/comments",commentRoutes);

const frontEndRoutes = require('./frontEndController');
router.use("/",frontEndRoutes);

module.exports = router;