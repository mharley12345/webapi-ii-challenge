const express = require('express')
const port = 8000
const postRouter = require('./posts/posts-router')

const server = express()

server.use(express.json())

// server.use('api/posts', postRouter)

server.get('/',(req,res) =>{
    res.send(`
    <h1>Mike's Api</h1>
    <p>Welcome to my API</p>`)
})

server.listen(port,() =>{
    console.log(`\n **** Server Running on Port:${port} ****\n`)
})