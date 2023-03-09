const express = require('express');
const sequelize = require('../config/connection');
const router = express.Router();
const { User, Weblog, Comment } = require('../models');
const { Op } = require("sequelize");


router.get("/", (req,res) => {
    User.findAll()
    .then(userData=> {
        res.json(userData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
});
   
router.get("/logout", (req,res) => {
    req.session.destroy();
    res.redirect("/login")
});
   
router.post("/login", (req,res) => {
    User.findOne({
        where:{
            username: req.body.username,
        },
    })
    .then(userData=>{
        if(!userData){
            res.status(401).json({msg:"Incorrect user information."})
        } else {
            if(bcrypt.compareSync(req.body.password, userData.password)) {
                req.session.userId = userData.id;
                req.session.username = userData.username;
                req.session.logged_in = true;
                return res.json(userData);
            } else {
                res.status(401).json({msg:"Incorrect user information."})
            }
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
});

router.get("/:id", (req,res) => {
    User.findByPk(req.params.id)
    .then(userData=>{
        if (userData) {
            return res.json(data);
        } else {
            res.status(404).json({
                message: "Record does not exist.",
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
});
   
router.post("/", (req,res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    })
    .then(userData=>{
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;
        res.json(userData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})
   
module.exports = router;