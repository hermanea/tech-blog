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
        include:[BlogPost]
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
        email:req.body.email,
        password:req.body.password
    })
    .then(userData=>{
        req.session.userId = userData.id;
        req.session.userEmail = userData.email;
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
                req.session.userEmail = userData.email;
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
   
// router.delete("/:id", (req,res)=>{
//     if(req.session.userId){
//         User.findByPk(req.params.id).then(userData=>{
//         if(!userData){
//             res.status(404).json({msg:"No such user!"})
//         } else if(userData.id===req.session.userId){
//             User.destroy({where: {
//             id:req.params.id
//             }})
//             res.send("User deleted!")
//         } else {
//             res.status(403).json({msg:"You can not delete another user!"})
//         }
//         }).catch(err=>{
//         console.log(err);
//         res.status(500).json({msg:"Error.",err})
//         })
//     } else {
//         res.status(403).json({msg:"login to delete a user!"})
//     }
// })
   
module.exports = router;
