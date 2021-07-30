const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const app = express();

app.get('/', (req, res) =>{
    res.send("i am working")
})
app.listen(4000);