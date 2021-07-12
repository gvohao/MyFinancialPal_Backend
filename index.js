const express = require('express')
require("./lib/mongodb")
const app = express()
require('dotenv').config()
const session = require('express-session')

const cors = require('cors')

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const path = require('path');

app.use("/api/retire", require("./routes/retire.route"))
app.use("/user", require('./routes/users.route'))
app.use("/auth", require("./routes/auth.route"))
app.get("/",(req,res)=>res.status(200).send("hello!"))

app.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`))
