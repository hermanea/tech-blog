const express = require('express');
const router = express.Router();
const {User,Weblog,Comment} = require('../models');

router.get("/", (req,res)=>{
    Comment.findAll({
       include:[User,Weblog]
    }).then(weblogData=>{
       res.json(weblogData)
    }).catch(err=>{
       console.log(err);
       res.status(500).json({msg:"Error.",err})
    })
})
   
router.get("/:id", (req,res)=>{
    Comment.findByPk(req.params.id,{
        include:[User,Weblog]
    }).then(commentData=>{
        res.json(commentData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})
   
router.post("/", (req,res)=>{
    Comment.create({
        WeblogId:req.body.WeblogId,
        text:req.body.text,
        UserId:req.session.UserId
    }).then(weblogData=>{
        res.json(weblogData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})
   
router.delete("/:id", (req,res)=>{
    if(req.session.userId){
        Comment.findByPk(req.params.id,{
        include:[User]
    }).then(commentData=>{
        if(!commentData){
        res.status(404).json({msg:"No such comment!"})
        } else if(commentData.UserId===req.session.userId){
        Comment.destroy({where: {
            id:req.params.id
            }
        })
        res.send("Comment deleted.")
        } else {
        res.status(403).json({msg:"You can not delete another users comment!"})
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
    } else {
        res.status(403).json({msg:"Please login to delete a comment!"})
    }
})

module.exports = router;