const express = require('express');
const router = express.Router()
const {User,Comment,BlogPost} = require('../models')

router.get("/", (req,res)=>{
    BlogPost.findAll({
        include:[User,Comment]
    })
    .then(blogPostData=>{
        res.json(blogPostData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})

router.get("/:id", (req,res)=>{
    BlogPost.findByPk(req.params.id,{
        include:[User, Comment]
    })
    .then(blogPostData=>{
       res.json(blogPostData)
    })
    .catch(err=>{
       console.log(err);
       res.status(500).json({msg:"Error.",err})
    })
})

router.post("/", (req,res)=>{
   if(req.session.userId){
      BlogPost.create({
         title:req.body.title,
         blogPost:req.body.post,
         UserId:req.session.userId
     })
     .then(blogPostData=>{
        res.json(blogPostData)
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
    BlogPost.update({
        post:req.body.post
    },{
        where:{
            id:req.params.id
        }
    })
    .then(blogPostdata=>{
        if(blogPostdata[0]){
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
      BlogPost.findByPk(req.params.id,{
         include:[User]
     })
     .then(blogPostData=>{
        if(!blogPostData){
         res.status(404).json({msg:"No such post!"})
        } else if(postData.UserId===req.session.userId){
         BlogPost.destroy({where: {
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