const express = require('express')

const Posts = require('../data/db')

const router = express.Router();

router.get('/',(req,res)=>{
    Posts.find(req.query)
    .then(posts =>{
        res.status(200).json(posts);
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
    //  if (req.params.id === posts.id)
          .then(posts =>{
              if(posts.id === posts.id ){
                  
                  res.status(200).json(posts)
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
router.get('/:id/comments',(req,res)=>{
    Posts.findCommentById(req.params.id)
    .then(comments =>{
        if (comments) {
            res.status(200).json(comments)
        }else {
            res.status(404).json({message:'User not found'})
        }
    })
    .catch(error=>{
        console.log(error,"Getting Comment");
        res.status(500).json({message:'Server Error while retrieving comment'})
    })
})
router.post('/',(req,res) => {
    Posts.insert(req.body)
    .then(posts =>{
     
        res.status(201).json(posts)
    })
    .catch(error =>{
        console.log(error,"Post Error");
        res.status(500).json({
            message:'Error adding posts'
        })
    })
})
router.put('/:id',(req,res)=>{
    const changes = req.body
    Posts.update(req.params.id, changes)
    .then(posts =>{
        if (posts){
            Posts.findById(res.params.id).then(changedUsers=>{
                res.status(200).json(changedUsers)
            })
            // res.status(200).json(posts);

        }else {
            res.status(404).json({message:'Post could not be found'})
        }
    })
    .catch(error =>{
        console.log(error,"Update");
        res.status(500).json({
            message:'Error on the update'
        })
    })
})
router.delete('/:id', (req,res)=>{
    Posts.remove(req.params.id)
    .then(count =>{
        if(count > 0){
            res.status(200).json({message:'Post has been deleted'})
        }else{
            res.status(404).json({message:'Post not found'})
        }
    })
    .catch(error =>{
        console.log(error,"Delete");
        res.status(500).json({
            message:'Server Error deleting post'
        })
    })
})
router.post('/:id/comments',(req,res)=>{
    Posts.insertComment(req.body)
     .then(comments =>{
        res.status(201).json(comments)
     })
     .catch(error =>{
        console.log(error,'Posting Comments');
        res.status(500).json({
            message:'Error posting comments'
        })
     })
})
module.exports = router