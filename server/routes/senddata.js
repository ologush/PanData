var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test_user:wordpass@cluster0-hskxu.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//const client = new MongoClient(uri , { useNewUrlParser: true});

var cors = require('cors');
router.use(cors());


const mapsApiUri = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
const remainingUri = "&key=AIzaSyBstzccH5Mhbjpz6qR6tHipcb_U4CHgeSg";


router.post('/', async function(req, res) {

  console.log("Post Recieved");
  try {
    const testClient = await MongoClient.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      //May have to convert to JSON
      const data = req.body;

      //This will have to be changed to match the data schema
      const lat = data.latitude;
      const long = data.longitude;
      
      const connectionUri = mapsApiUri + lat + "," + long + remainingUri;

      const param = {
        headers: {
            "content-type":"application/json"
        },
        method:'POST'
      }

      fetch(connectionUri, param)
      .then(res => {
        res.json()
        .then(data => {
          if (data.status == "OK")
          {
            console.log(data.formatted_address);
          }
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })

  
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