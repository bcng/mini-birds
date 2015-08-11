//Dependencies
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

//Express
var app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Run mongod : birds is the database and sightings is the collection
var db = mongojs('birds', ['sightings']);

// Name a collection
var sightings = db.collection('sightings');

//Endpoints 
app.post('/api/sighting', function(req, res) {
    db.sightings.save(req.body, function(err, birds) {
        if (!err) {
            res.json(birds);
        } else {
            return res.status(500).json(err);
        }
    });
    console.log('post hit');
})

app.get('/api/sighting', function(req, res) {
    db.sightings.find({
        region: 'america',
        species: 'redrobin'
    }, function(err, birds) {
        if (err) {
            return res.status(500).json(err);
        } else {
            res.json(birds);
        }
    });

    console.log('get hit');
})

app.delete('/api/sighting', function(req, res) {
    db.sightings.remove()
    console.log('delete hit');
    res.end();
})

app.put('/api/sighting', function(req, res) {
    db.sightings.findAndModify()
    console.log('put hit');
    res.end();
})

//API connection
var port = 9001;
app.listen(port, function() {
    console.log("listening on port " + port)
});
