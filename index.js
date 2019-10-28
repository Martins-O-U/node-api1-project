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
    const userInfo= req.body;

    db.insert(userInfo)
        .then(user =>{
            res.status(201).json({success: true, user})
        })
        .catch(error=>{
            res.status(500).json({success:false, error})
        })
})

server.delete('/api/users/:id', (req, res)=>{
    const {id} = req.params;

    db.remove(id)
        .then(deleted =>{
            if(deleted){
                res.status(204).end()
            }else{
                res.status(404).json({success: false, message: 'Could Not find the user'})
            }
        })
        .catch(error =>{
            res.status(500).json({success: false, error})
        })
})

server.put('/api/users/:id', (req, res) =>{
    const {id} = req.params;
    const edited = req.body;

    db.update(id, edited)
        .then(data => {
            if (data){
                res.status(200).json({success: true, data})
            }else {
                res.status(404).json({success: false, message: "Could not find the user"})
            }
        })
        .catch(error =>{
            res.status(500).json({success:false, error})
        })
});

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
