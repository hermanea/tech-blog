const express = require('express');
const router = express.Router();
const { User, Weblog, Comment } = require('../models');

router.get("/", (req,res)=>{
    Comment.findAll({
      include:[
        {
          model: User,
        },
        {
          model: Weblog
        }
      ]
    })
    .then(commentData=>{
       res.json(commentData)
    })
    .catch(err=>{
       console.log(err);
       res.status(500).json({msg:"Error.",err})
    })
});
   
router.get("/:id", (req,res)=>{
    Comment.findByPk(req.params.id,{
        include:[
          {
          model: User
          }
        ]
    }).then(commentData=>{
        res.json(commentData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
})
   
router.post("/", (req,res)=>{
    Comment.create({
        content: req.body.content,
        UserId: req.session.userId,
        WeblogId: parseInt(req.body.weblogId),
        include: [
          {
            model: User,
          },
          {
            model: WeblogUser,
          },
        ]
    })
    .then(commentData=>{
        console.log(req.body);
        console.log(commentData);
        res.json(commentData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
});

router.put("/:id", (req, res) => {
    Comment.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((data) => {
        if (data[0]) {
          return res.json(data);
        } else {
          return res.status(404).json({
            message: "Record does not exist.",
          })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error.",
          error: error,
        })
    })
});
   
router.delete("/:id", (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        if (data) {
          return res.json(data);
        } else {
          return res.status(404).json({
            message: "Record does not exist.",
          })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Server error! Unable to delete record.",
          error: error,
        })
    })
});

router.get("/post/:id", (req,res)=>{
  Weblog.findByPk(req.params.id,{
     include:[
      {
        model: Comment,
        include: [User]
      }
    ]
  }).then(commentData=>{
     res.json(commentData)
  }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"An error occured",err})
  })
})

module.exports = router;