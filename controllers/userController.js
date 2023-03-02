const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User} = require('../models');

router.get("/", (req,res)=>{
    User.findAll().then(userData=>{
       res.json(userData)
    })
    .catch(err=>{
       console.log(err);
       res.status(500).json({msg:"Error.",err})
    })
   })
   
router.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/")
})
   
router.get("/:id", (req,res)=>{
    User.findByPk(req.params.id,{
        include:[WeblogPost]
    })
    .then(userData=>{
        res.json(userData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})
   
router.post("/", (req,res)=>{
    User.create({
        username:req.body.username,
        password:req.body.password
    })
    .then(userData=>{
        req.session.userId = userData.id;
        res.json(userData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})
   
router.post("/login", (req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(userData=>{
        if(!userData){
            res.status(401).json({msg:"Incorrect user information."})
        } else {
            if(bcrypt.compareSync(req.body.password,userData.password)){
                req.session.userId = userData.id;
                return res.json(userData)
            } else {
                res.status(401).json({msg:"Incorrect user information."})
            }
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})
   
module.exports = router;
