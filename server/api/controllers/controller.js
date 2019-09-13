const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const credentials = require("../credentials.json"); 

import { validations }    	from '../validations/emailValidations.js'
import bcrypt             	from 'bcryptjs';
import path               	from 'path'
import { projectModel }     from '../models/model'
import mongoose 			from'mongoose';

// MongoDB connection URL
const url = process.env.PORT == 8081 ? 
  `mongodb+srv://${credentials.DB_USER}:${credentials.DB_PASS}@dev-portfolio-cpini.mongodb.net/test?retryWrites=true&w=majority` : 
  "mongodb://localhost:27017";
const DBName = 'projectsDB';

// EDITS
export const editField = (req, res) => {
  
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
	if (err) throw err 

	let db = client.db(DBName)

	const id = new ObjectID(req.body._id)

	// update here
	db.collection('projects')
	  .updateMany(
		{_id: id},
		{$set: {
		  "projectName": req.body.projectName,
		  "mainImagePath": req.body.mainImagePath,
		  "summary": req.body.summary,
		  "sections": req.body.sections,
		  "position": req.body.position,
		  "githubLink": req.body.githubLink,
		  "bkgColor": req.body.bkgColor
		}}
	  )

	  res.send("successful")

  });
}

export const addProject = (req, res) => {

	const newProject = new projectModel(req.body.newProject)

	mongoose.connect(`${url}/${DBName}`, {useNewUrlParser: true})
		.then(() => {
			// console.log('Database connection successful')
			newProject.save(function (err, project) {
				if (err) return res.status(400);
				console.error("Project: " + newProject.projectName + " was added successfully");
			})
			
			}).catch(err => {
			console.error('Database connection error')
		})

	MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
		if (err) throw err 

		let db = client.db(DBName)

		const id = new ObjectID(req.body._id)
		// update here
		db.collection('projects')
			.find({}).sort({position: 1})
			.toArray(function(err, docs) {
				res.json(docs);
			});

	  });
}

export const deleteProject = (req, res) => {
  
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
	if (err) throw err 

	let db = client.db(DBName)

	const id = new ObjectID(req.params.id)

	db.collection('projects')
	  .deleteOne({_id: id})


  });
}


// GET ALL PROJECTS
export const viewAllProjects = (req, res) => {
	
	MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
		if (err) throw err 

		let db = client.db(DBName)

		db.collection('projects')
			.find({}).sort({position: 1})
			.toArray(function(err, docs) {
				res.json(docs);
			});
	});
}

export const viewRecentProjects = (req, res) => {
  
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
	if (err) throw err 

	let db = client.db(DBName)

	db.collection('projects')
	  .find({}).sort({position: 1}).limit(3)
	  .toArray(function(err, docs) {
		  res.json(docs);
		});
  });
}

export const getAllProjectId = (req, res) => {
  
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
	if (err) throw err 

	let db = client.db(DBName)

	db.collection('projects')
	  .find({}, {projection: {"_id" : 1, "projectName" : 1}}).sort({position: 1})
	  .toArray(function(err, docs) {
		  res.json(docs);
		});
  });
}

// GET PROJECT BY ID
export const projectById = (req, res) => {

	MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
		if (err) throw err 

		let db = client.db(DBName)
		let id = req.params._id;

		db.collection('projects')
			.findOne({_id: new ObjectID(id)}, function(err, docs) {
				res.json(docs);
			});
	}) 
}

export const authenticateUser = (req, res) => {
  // expect this to return a promise
  // users will be stored in a database
  // var hash = bcrypt.hashSync("password", bcrypt.genSaltSync(10))

  // storing these in a hash table could produce a faster search time
  // the username would have to be unique for this to work
  const users = [
	{   id:1, 
	  username:"Jamie", 
	  hashedPassword: '$2a$10$NsKV68F.IQsg3b5ywgCVKef.ayIXnXei1ipIIuvMWjBLljIM6q5yC'
	}
  ]

  // collect request parameters and assign to user object
  const sentUser = { 
	name: req.body.username, 
	password: req.body.password 
  }

  // check every avaiable user for a match
  // can make this more efficient
  // if (key value pair exists) select and check password
  users.forEach((user) => {
	if(user["username"] === sentUser.name) {
	  // if username exists check password
	  if(bcrypt.compareSync(sentUser.password, user.hashedPassword)) {
		// if successful respond with all user information
		res.status(200)
		res.send(user)  
	  } else {
		res.status(401)
		res.send("Invalid credentials") 
	  } 
	} else {
	  res.status(401)
	  res.send("Invalid credentials")
	}
  })
}

// HANDLE EMAIL REQUEST
export const handleEmail = async (req, res) => {

  let mailOptions, smtpTrans;

  // CREATE OAUTH2 CLIENT
  const oauth2Client = new OAuth2(
	 credentials.ClientID, // ClientID
	 credentials.clientSecret, // Client Secret
	 "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
	 refresh_token: credentials.refreshToken
  });

  const tokens = await oauth2Client.refreshAccessToken()
  const accessToken = tokens.credentials.access_token

  // SET UP A TRANSPORT VIA GMAIL
  smtpTrans = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
	  type: 'OAuth2',
	  user: credentials.GMAIL_USER,
	  ClientID: credentials.ClientID, 
	  clientSecret: credentials.clientSecret,
	  refreshToken: credentials.refreshToken,
	  accessToken: accessToken
	}
  });

  // ASSIGN MAIL OPTIONS OBJECT
  mailOptions = {
	from: req.body.name + ' &lt;' + req.body.email + '&gt;',
	to: credentials.GMAIL_USER,
	subject: req.body.subject,
	text: 
	  "Message recieved from: " + req.body.name +
	  "\n \nEmail: " + req.body.email +
	  "\n \nMessage: " + req.body.message
  }

  //SEND THE EMAIL USING THE TRANSPORT AND MAIL OPTIONS
  smtpTrans.sendMail(mailOptions, function(error, response) {
	if(error) {
	  console.log(error)
	} else {
	  console.log(response)
	}
  })    

  smtpTrans.close();

}
