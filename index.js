const express = require('express')
const app = express()
const db = require('./db/mongoose') 
const dotenv= require('dotenv')
const cors = require('cors')
dotenv.config()
db()

app.use(cors())
app.use(express.json())
app.use(`/api/v2002`,require('./router/router.js'))

const PORT = 2002
app.listen(PORT,()=>{
    console.log('listen post' + PORT);
})