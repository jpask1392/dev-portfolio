// custom dependencies 
import routes from './api/routes/routes';
const data = require('./data/data.json');
var ObjectID = require('mongodb').ObjectID;

// dependencies
const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

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
}) ;

//POST REQUEST

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
	console.log(req.body.subject);
	main(req);
	res.send("Message recieved");

})

async function main(req){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "jamiepask1392@gmail.com", // list of receivers
    subject: `${req.body.subject}`, // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


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


