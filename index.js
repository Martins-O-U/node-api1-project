// implement your API here

const express = require('express')
const cors = require('cors')

const db = require('./data/db')
const server = express()

server.use(cors())
server.use(express.json())

server.get('*', handleDefault)

function handleDefault (req, res){
    res.json('Test Succeeded!')
}

server.listen(process.env.port || 3000, () => {
    console.log('listening on ' + (process.env.port || 3000))
})
