// implement your API here

const express = require('express')
const cors = require('cors')
const db = require('./data/db')

const server = express()

server.use(cors())
server.use(express.json())

server.get('/api/users/:id', getUserById)
server.get('/api/users', getUsers)
server.get('*', handleDefault)

function getUserById(req, res){
    
    const { id } = req.params;

    db.findById(id)
        .then(data =>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(error=>{
            console.log(error)
        })
}

function getUsers (req, res){
    db.find()
        .then(data=>{
            console.log(data)
            res.json(data)
        })
        .catch(error=>{
            console.log(error)
        })
}

function handleDefault (req, res){
    res.json('Test Succeeded!')
}

server.listen(process.env.port || 3000, () => {
    console.log('listening on ' + (process.env.port || 3000))
})
