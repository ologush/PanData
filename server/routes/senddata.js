var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test_user:wordpass@cluster0-hskxu.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//const client = new MongoClient(uri , { useNewUrlParser: true});

var cors = require('cors');
router.use(cors());



router.post('/', async function(req, res) {

  console.log("Post Recieved");
  try {
    const testClient = await MongoClient.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      const data = req.body;
  
      const testDB = testClient.db("test");
      const collection = testDB.collection("devices");

      collection.insertOne(data)
      .then(result => {
        console.log("Inserted into the database");
      })
      .catch(err => {
        console.log(err);

      })

  } catch (e) {
    console.log(e);
  }

});



router.get('/', function(req, res) {
  console.log("GET RECIEVED");
  res.send("server recieved the ger request");

});

module.exports = router;