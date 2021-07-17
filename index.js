const express = require('express')
require("./lib/mongodb")
const app = express()
require('dotenv').config()
const session = require('express-session')
// const path = require('path');
const cors = require('cors')

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static(path.resolve(__dirname, 'build')));


app.use("/api/retire", require("./routes/retire.route"))
app.use("/api/user", require('./routes/users.route'))
app.use("/api/auth", require("./routes/auth.route"))
app.get("/api", (req,res)=>res.status(200).send("hello!"))
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

app.listen(process.env.PORT || 5555, () => console.log(`running on 5555`))
