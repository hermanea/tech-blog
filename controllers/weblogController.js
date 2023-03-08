const express = require('express');
const router = express.Router();
const {User,Weblog,Comment} = require('../models');

router.get("/", (req,res)=>{
    Weblog.findAll({
        include:[User,Comment]
    }).then(weblogData=>{
        res.json(weblogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})

router.get("/:id", (req,res)=>{
    Weblog.findByPk(req.params.id,{
        include:[User,Comment]
    }).then(weblogData=>{
       res.json(weblogData)
    }).catch(err=>{
       console.log(err);
       res.status(500).json({msg:"Error.",err})
    })
})

router.post("/", (req,res)=>{
   Weblog.create({
      title:req.body.title,
      text:req.body.text,
      UserId:req.session.userId
   }).then(weblogData=>{
      res.json(weblogData)
   }).catch(err=>{
      console.log(err);
      res.status(500).json({msg:"Error.",err})
   })
})

router.put("/:id",(req,res)=>{
    Weblog.update(req.body, {
        where:{
            id:req.params.id
        }
    }).then(weblogData=>{
       res.json(weblogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
 })

router.delete("/:id", (req,res)=>{
      Weblog.findByPk(req.params.id,{
         include:[User]
     })
     .then(weblogData=>{
        if(!weblogData){
         res.status(404).json({msg:"No such post!"})
        } else if(weblogData.UserId===req.session.userId){
         Weblog.destroy({
            where:{
            id:req.params.id
            }
         }).then(() => {
            return res.send("Post deleted!")
         })
        }
     }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
     })
})

module.exports = router;