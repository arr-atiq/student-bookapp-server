const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.skqkk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});



client.connect((err) => {
  const student = client.db("studentBook").collection("student");
  const subject = client.db("studentBook").collection("subject");



  
});

app.listen(process.env.PORT || port);
