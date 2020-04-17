var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test_user:wordpass@cluster0-hskxu.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

var cors = require('cors');
router.use(cors());


router.post('/', function(req, res) {

  console.log("POST RECIEVED");

    client.connect(err => {
        const collection = client.db("test").collection("devices");
        console.log("POST RECIEVED");

        //const data = JSON.stringify(req.body);
        const data = req.body;

        collection.insertOne(data);
        // perform actions on the collection object
        client.close();
      });

      res.send('attempted to send data to db');



});

router.get('/', function(req, res) {
  console.log("GET RECIEVED");
  res.send("server recieved the ger request");

});

module.exports = router;