const express = require('express');
const router = express.Router();
const {User,Comment,BlogPost} = require('../models')

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

router.get("/homepage",(req,res)=>{
    if(req.session.userId){
        BlogPost.findAll({
            include:[User, Comment]
        })
        .then(userData => {
            const hbsUser = userData.map(post=>post.toJSON())
            const session = JSON.stringify(req.session)
            // console.log(hbsUser);
            // console.log(session);
            res.render("homepage", {
                posts:hbsUser, session
            })
        })
    } else {
        res.redirect('/login');
    }
})

module.exports = router;