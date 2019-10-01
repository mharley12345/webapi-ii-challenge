const express = require('express')

const Posts = require('../data/db')

const router = express.Router();

router.get('/',(req,res)=>{
    Posts.find(req.query)
    .then(post =>{
        res.status(200).json(post);
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            message:'Error getting data'
        });
    })
})

module.exports = router