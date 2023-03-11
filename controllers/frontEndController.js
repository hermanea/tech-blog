const express = require('express');
const router = express.Router();
const { User, Weblog, Comment } = require("../models");

// router.get("/", (req,res)=>{
//     if(req.session.logged_in){
//         res.redirect("/homepage");
//     } else {
//         res.redirect("/login");
//     }
// });

router.get("/",(req,res)=>{
  Weblog.findAll({
      include:[User, Comment]
  }).then(weblogData=>{
      console.log(weblogData)
      const hbsWeblogs = weblogData.map(weblog=>weblog.toJSON())
      console.log(hbsWeblogs)
      res.render("homepage",{
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

router.get("/post/:id", (req,res) => {
  const { id } = req.params;
  Weblog.findByPk(id, {
      include:[User, Comment]
  })
  .then(weblogCommentData=>{
      console.log(weblogCommentData)
      console.log(weblogCommentData.toJSON());
      res.render('post', {
        weblog: weblogCommentData.toJSON(),
      })
    }).catch(err=>{
      console.group(err);
      res.status(500).json({msg:"Error.", err})
  })
});

router.get("/post/:id", (req,res) => {
  const { id } = req.params;
  Weblog.findByPk(id, {
      include:[User, Comment]
  })
  .then(weblogCommentData=>{
      console.log(weblogCommentData)
      console.log(weblogCommentData.toJSON());
      res.render('post', {
        weblog: weblogCommentData.toJSON(),
      })
    }).catch(err=>{
      console.group(err);
      res.status(500).json({msg:"Error.", err})
  })
});

// router.get("/weblog/:id", (req,res)=>{
//   Weblog.findByPk(req.params.id,{
//     include:[User,Comment]
//    })
//    .then((weblogData)=>{
//       console.log(weblogData)
//       const hbsWeblogs = weblogData.toJSON();
//       console.log(hbsWeblogs)
//       res.render("weblog", hbsWeblogs)
//   })
// })

// router.get("/weblog/:id", (req,res) => {
//   Weblog.findByPk(req.params.id,{
//       include:[User, Comment]
//   })
//   .then(weblogData=>{
//       console.log(weblogData)
//       const hbsWeblogs = weblogData.map(weblog=>weblog.toJSON())
//       console.log(hbsWeblogs)
//       res.render("weblog",{
//           Weblog:hbsWeblogs
//       })
//   })
// })



// router.get("/post/:id", (req,res) => {
//   Weblog.findByPk(req.params.id,{
//       include:[User, Comment]
//   })
//   .then(weblogCommentData=>{
//     console.log(weblogCommentData)
//     const hbsCommentData = weblogCommentData.toJSON();
//     console.log(hbsCommentData)
//     res.render("post", hbsCommentData)
// })
// })


module.exports = router;