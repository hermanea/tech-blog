const express = require('express');
const router = express.Router();
const {User,Weblog,Comment} = require('../models');

// router.get("/", (req,res)=>{
//     if(req.session.userId){
//         res.redirect('/homepage');
//     } else {
//         res.redirect('/login');
//     }
// })

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
            include:[Weblog]
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
    Weblog.findAll({
        include:[User, Comment]
    }).then(userData => {
        const hbsUser = userData.map(weblog=>weblog.toJSON())
        const session = JSON.stringify(req.session)
        res.render("homepage", {
            weblogs:hbsUser, session
        })
    })
})

router.get('/post/:id', (req,res) => {
    Blog.findByPk(req.params.id,{
        include:[{
            model:Comment,
            include:{
                model:User
            }
        }]
    }).then(weblogData=>{
        console.log(weblogData.toJSON());
        res.render("post",{
            weblog: weblogData.toJSON(),
            session:req.session
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
});


module.exports = router;