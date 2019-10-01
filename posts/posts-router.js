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
router.get('/:id',(req,res)=> {
    Posts.findById(req.params.id)
          .then(post =>{
              if(post){
                  res.status(200).json(post)
              } else {
                  res.status(404).json({message:'User not found'})
              } 
         })
         .catch(error =>{
             console.log(error);
             res.status(500).json({
                message:'Server Error getting user'
             })
         })
})

module.exports = router