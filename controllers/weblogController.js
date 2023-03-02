const express = require('express');
const router = express.Router()
const {User,Comment,Weblog} = require('../models')

router.get("/", (req,res)=>{
    Weblog.findAll({
        include:[User,Comment]
    })
    .then(weblogData=>{
        res.json(weblogData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})

router.get("/:id", (req,res)=>{
    Weblog.findByPk(req.params.id,{
        include:[User, Comment]
    })
    .then(weblogData=>{
       res.json(weblogData)
    })
    .catch(err=>{
       console.log(err);
       res.status(500).json({msg:"Error.",err})
    })
})

router.post("/", (req,res)=>{
   if(req.session.userId){
      Weblog.create({
         title:req.body.title,
         weblog:req.body.post,
         UserId:req.session.userId
     })
     .then(weblogData=>{
        res.json(weblogData)
     })
     .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
     })
  } else {
      res.status(403).json({msg:"Login to post!"})
  }
})

router.put("/:id",(req,res)=>{
    Weblog.update({
        post:req.body.post
    },{
        where:{
            id:req.params.id
        }
    })
    .then(weblogdata=>{
        if(weblogdata[0]){
            return res.json(data)
        } else {
            return res.status(404).json({msg:"No Such Record."})
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"Error.",
            err:err
        })
    })
 })

router.delete("/:id", (req,res)=>{
   if(req.session.userId){
      Weblog.findByPk(req.params.id,{
         include:[User]
     })
     .then(weblogData=>{
        if(!weblogData){
         res.status(404).json({msg:"No such post!"})
        } else if(postData.UserId===req.session.userId){
         Weblog.destroy({where: {
            id:req.params.id
         }})
         res.send("Post deleted!")
        } else {
         res.status(403).json({msg:"You can not delete another users post!"})
        }
     })
     .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"An error occured",err})
     })
   } else {
      res.status(403).json({msg:"Login to delete a post!"})
   }
})

module.exports = router;