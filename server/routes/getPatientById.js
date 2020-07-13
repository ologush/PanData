var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test_user:wordpass@cluster0-hskxu.azure.mongodb.net/test?retryWrites=true&w=majority";
const assert = require('assert');



var cors = require('cors');
router.use(cors());

router.post('/:id', async function(req, res){
    
    let id = req.params.id;

    console.log("Requesting the information for patient" + id);

    try {

      const client = await MongoClient.connect(
        uri,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );

      const db = client.db("test");
      const collection = db.collection("devices");

    

      const data = collection.findOne({
        identifier: id
      })
      .then(doc => {
        console.log(doc);
        res.json(doc);
      })
      .catch(err => {
        console.log(err);
      })

    } catch (e) {
      console.log(e);
    }
});

module.exports = router;