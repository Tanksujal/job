const express = require('express')
const Connectdb = require('./config/db')
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 4000
dotenv.config()
//db connect
Connectdb()
//route connect
const corsOptions = {
    origin: 'https://job-virid.vercel.app', // Replace with the client URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions))
app.use(cookieparser())
app.use(express.static(path.join(__dirname, 'uploads')))
app.use('/resume',express.static(path.join(__dirname,'resume')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/',require('./routes/indexRoutes'))
app.listen(port,(err)=>{
    if(err) console.log(err)
    console.log(`Server Running On The Port = ${port}`);
})