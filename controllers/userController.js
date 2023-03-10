const express = require('express');
const router = express.Router();
const { User, Weblog, Comment } = require('../models');
const bcrypt = require("bcrypt");

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
        }
    })
    .then(userData=>{
        if(!userData){
            res.status(401).json({msg:"Incorrect user information."})
        } else {
            if(bcrypt.compareSync(req.body.password, userData.password)) {
                req.session.userId = userData.id;
                req.session.username = userData.username;
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
    User.findByPk(req.params.id, {
        include:[Weblog]
    })
    .then(userData=>{
        res.json(userData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
});
   
router.post("/", (req,res) => {
    console.log(req.body);
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData=>{
        req.session.userId = userData.id;
        req.session.username = userData.username;
        res.json(userData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})
   
module.exports = router;