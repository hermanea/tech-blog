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
      include:[User]
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
        res.render("login")
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
    
router.get("/homepage", async (req,res) => {
    try {
      if (req.session.logged_in) {
        console.log(req.session);
        const weblogData = await Weblog.findAll({
          include: [User, Comment],
        });
        const weblogs = weblogData.map((weblog) => weblog.get({ plain: true }));
        console.log(weblogs);
        res.render("homepage", {
          weblogs,
          logged_in: req.session.logged_in,
        })
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      res.status(500).json({
        msg: "Error.",
        error,
      })
    }
});

//     router.get('/post/:id', (req,res) => {
//           Blog.findByPk(req.params.id,{
//                 include:[{
//                       model:Comment,
//             include:{
//                 model:User
//             }
//         }]
//     }).then(weblogData=>{
//         console.log(weblogData.toJSON());
//         res.render("post",{
//             weblog: weblogData.toJSON(),
//             session:req.session
//         })
//     }).catch(err=>{
//         console.log(err);
//         res.status(500).json({msg:"Error.",err})
//     })
// });

module.exports = router;