var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test_user:wordpass@cluster0-hskxu.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//const client = new MongoClient(uri , { useNewUrlParser: true});
const assert = require('assert');

var cors = require('cors');
router.use(cors());

router.post('/:id', function(req, res){

    console.log("Requesting the information for patient" + id);
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        //May need to use await, and if so in an async function
        const data = collection.find({ identifier: id });


        res.json(data);

        
        

        
        // perform actions on the collection object
        client.close();
      });

      res.send('attempted to send data to db');

});

module.exports = router;