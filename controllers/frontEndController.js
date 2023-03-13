const express = require('express');
const router = express.Router();
const { User, Weblog, Comment } = require("../models");

router.get("/",(req,res)=>{
  Weblog.findAll({
      include:[User, Comment]
  }).then(weblogData=>{
      console.log(weblogData)
      const hbsWeblogs = weblogData.map(weblog=>weblog.toJSON())
      console.log(hbsWeblogs)
      res.render("home",{
          allWeblogs:hbsWeblogs
      })
  })
})

router.get("/login",(req,res)=>{
  if(req.session.userId){
    res.redirect("/dashboard")
  } else {
    res.render("login")
  }
})

router.get("/signup",(req,res)=>{
  res.render("signup")
})

router.get("/dashboard", (req,res) => {
  if (!req.session.userId) {
    return res.redirect("/login")
  }
  User.findByPk(req.session.userId,{
    include: [Weblog]
  })
  .then(userData=>{
    console.log(userData)
    const userHbs = userData.toJSON();
    console.log(userHbs)
    res.render("dashboard", userHbs)
  })
})


router.get("/viewblog/:weblogId", (req,res) => {
  const { weblogId } = req.params;
  Weblog.findByPk(weblogId, {
      include:[
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: Comment,
          include: [User]
        },
      ],
  })
  .then(weblogCommentData=>{
      console.log(weblogCommentData)
      console.log(weblogCommentData.toJSON());
      res.render('viewblog', {
        weblogCommentData: weblogCommentData.toJSON(),
      })
    }).catch(err=>{
      console.group(err);
      res.status(500).json({msg:"Error.", err})
  })
});

module.exports = router;