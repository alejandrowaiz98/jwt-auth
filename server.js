const express = require('express')
const jwt = require("jsonwebtoken")
const posts = require("./posts")
require("dotenv").config()

const app = express()

app.use(express.json())

app.get("/posts",authenticateToken , (req, res) => {

    res.json(posts.filter(post => post.username = req.user.name))

})

// app.post('/login', (req, res) => {

//     console.log(req.body)

//     const username = req.body.username
//     const user = { name: username}

//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json({accessToken: accessToken})

// })

function authenticateToken(req,res,next) {

    console.log(req.headers["authorization"])

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]

    console.log(token)

    if (token == null) {

        console.log("null token")

        return res.sendStatus(401)

    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) {

            console.log(err)

            return res.sendStatus(403)

        }
        req.user = user 

        next()

    })

}


app.listen(3000)