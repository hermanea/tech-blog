const express = require('express');
const sequelize = require('../config/connection');
const router = express.Router();
const { User, Weblog, Comment } = require('../models');
const { Op } = require("sequelize");

router.get("/", (req,res)=>{
    Weblog.findAll()
    .then(weblogData=>{
        res.json(weblogData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
});

router.get("/:id", (req,res)=>{
    Weblog.findByPk(req.params.id)
    .then(weblogData=>{
       if (weblogData) {
        return res.json(weblogData);
       } else {
        res.status(404).json({
            message: "Record does not exist.",
        })
       }
    })
    .catch(err=>{
       console.log(err);
       res.status(500).json({msg:"Error.",err})
    })
});

router.post("/", (req,res)=>{
    Weblog.create({
        title: req.body.title,
        content: req.body.content,
        UserId: req.session.user_id,
    })
    .then(weblogData=>{
    res.json(weblogData);
    })
    .catch(err=>{
    console.log(err);
    res.status(500).json({msg:"Error.",err})
    })
});

router.put("/:id",(req,res)=>{
    Weblog.update(
        {
            title: req.body.title,
            content: req.body.content,
        },
        {
        where: {
            id:req.params.id
        },
    }
    )
    .then(weblogData=>{
        if (weblogData[0]) {
            return res.json(weblogData);
        } else {
            return res.status(404).json({
                message: "Record does not exist.",
        });
    }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
});

router.delete("/:id", (req,res)=>{
    Weblog.destroy({
    where: {
        id:req.params.id,
    },
    })
    .then((weblogData) => {
        if (weblogData) {
            return res.json(data);
      } else {
        return res.status(404).json({
          message: "Record does not exist.",
        });
    }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error.",err})
    })
});

module.exports = router;