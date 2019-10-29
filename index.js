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

server.post('/api/users', (req, res) =>{
    const userInfo = req.body;

    db.insert(userInfo)
        .then(user =>{
            if(user.name && user.bio){
                res.status(201).json({success: true, user})
            }else {
                res.status(400).json({success : false, message: "Please provide name and bio for the user"})
            }
        })
        .catch(error=>{
            res.status(500).json({success:false, message: "There was an error while saving the user to the database"})
        })
})

server.delete('/api/users/:id', (req, res)=>{
    const {id} = req.params;

    db.remove(id)
        .then(deleted =>{
            if(deleted){
                res.status(204).end()
            }else{
                res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
            }
        })
        .catch(error =>{
            res.status(500).json({success: false, message: "The user could not be removed"})
        })
})

server.put('/api/users/:id', (req, res) =>{
    const {id} = req.params;
    const edited = req.body;

    db.update(id, edited)
        .then(data => {
           if (!data){
                res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
           }
        //    else if (!data.name || !data.bio){
        //         res.status(400).json({success: false, message: "Please provide name and bio for the user."})
        //     } 
            else{
                res.status(200).json({success: true, data}) 
            }
        })
        .catch(error =>{
            res.status(500).json({success:false, message:"The user information could not be modified."})
        })
});

function getUserById(req, res){
    const { id } = req.params;

    db.findById(id)
        .then(data =>{
            if(data){
                res.status(200).json({success: true, data})
            }else {
                res.status(404).json({success:false, message: "The user with the specified ID does not exist."})
            }
        })
        .catch(error=>{
            res.status(500).json({success: false, message: "The users information could not be retrieved."})        
        })
}

function getUsers (req, res){
    db.find()
        .then(data=>{
            res.status(200).json({success: true, data})
        })
        .catch(error=>{
            res.status(500).json({success: false, message: "The users information could not be retrieved."})        
        })
}

function handleDefault (req, res){
    res.json('Test Succeeded!')
}

server.listen(process.env.port || 3000, () => {
    console.log('listening on ' + (process.env.port || 3000))
})
