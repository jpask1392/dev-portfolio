// custom dependencies 
import routes from './api/routes/routes';
const data = require('./data/data.json');
var ObjectID = require('mongodb').ObjectID;

// dependencies
const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL
const url = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(url);
const mongoDBName = 'learning_mongodb';
var db;

// variables
const PORT = 9000;

// routes function 
routes(app);

// use() for serving static files
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
})

app.get('/:_id', (req, res) => { 
	res.sendFile(__dirname + "/public/index.html");
}) 


// eventually move to routes file
app.get('/api/projects', (req, res) => {

	// Obtain the collection 'projects' from database
	const Collection = db.collection('projects');

	Collection.find({}, {projection: {"main-image-path" : 1}}).toArray(function(err, docs) {
	    res.json(docs);
	  });

});

// project id route - Just collect data via this api call
app.get('/api/projects/:_id', (req, res) => { 

	let id = req.params._id;

	const Collection = db.collection('projects');

	Collection.findOne({_id: new ObjectID(id)}, function(err, docs) {
	    res.json(docs);
	  });
}) 

// connect to the mongoDB server
client.connect(function(err, database) {
		
		if(err) {
			console.log(err)
		}

		console.log("connected sucessfully");
		db = client.db(mongoDBName);
		// client.close();
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})


