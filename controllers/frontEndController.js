const express = require('express');
const router = express.Router();
const {User,Comment,Weblog} = require('../models')

router.get("/", (req,res)=>{
    if(req.session.userId){
        res.redirect('/homepage');
    } else {
        res.redirect('/login');
    }
})

router.get("/login",(req,res)=>{
    if(req.session.userId){
        res.redirect('/homepage');
    } else {
        res.render("login");
    }
})

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.get("/dashboard", (req,res)=>{
    if(req.session.userId){
        User.findByPk(req.session.userId,{
            include:[{
                model:Weblog,
                include:{
                    model:Comment
                }
            }, Comment]
        })
        .then(userData => {
            const hbsUser = userData.toJSON()
            console.log(hbsUser);
            res.render("dashboard", {
                user:hbsUser
            })
        })
    } else {
        res.redirect('/login');
    }
})

router.get("/homepage",(req,res)=>{
    if(req.session.userId){
        Weblog.findAll({
            include:[User, Comment]
        })
        .then(userData => {
            const hbsUser = userData.map(post=>post.toJSON())
            const session = JSON.stringify(req.session)
            res.render("homepage", {
                posts:hbsUser, session
            })
        })
    } else {
        res.redirect('/login');
    }
})



module.exports = router;