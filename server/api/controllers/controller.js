const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const credentials = require("../credentials.json"); 

// MongoDB connection URL
const url = process.env.PORT == 8081 ? 
  `mongodb+srv://${credentials.DB_USER}:${credentials.DB_PASS}@dev-portfolio-cpini.mongodb.net/test?retryWrites=true&w=majority` : 
  "mongodb://localhost:27017";
const DBName = 'projectsDB';

console.log(url)

// const url = "blank";
// const DBName = 'blank';


// GET ALL PROJECTS
export const viewAllProjects = (req, res) => {
	
	MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
		if (err) throw err 

		let db = client.db(DBName)

		db.collection('projects')
			.find({}, {projection: {"mainImagePath" : 1}}).sort({position: 1})
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
      .find({}, {projection: {"_id" : 1}}).sort({position: 1})
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
