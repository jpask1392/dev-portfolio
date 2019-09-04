const mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'projectsDB';

// run ./api/models/model.js

// DEFINE THE PROJECT SCHEMA
// TODO - ADD VADLIATION INFORMATION
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  titleIntro: String,
  titleMain: String,
  summary: String,
  mainImagePath: String, 
  sections: [
        Object
  ]
})

// CREATE THE PROJECT MODEL USING THE SCHEMA
const projectModel = mongoose.model('Project', projectSchema)

// MAKE THIS DATA AVAILABLE THROUGH A UI - LATER 
// ADD THE REQUIRED DATA FOR UPLOADING TO THE DATABASE
const newProject = new projectModel({
  projectName: "Python2",
  titleIntro: "",
  titleMain: "Python Scripting",
  position: 1,
  summary: "Learning how to program with Python benefitted me greatly working within the field of Architecture. The language was able to interact with the major 3D CAD program ‘Revit’ in order to automate tasks, greatly improving efficiency and opened the ability to explore parametrically designed concepts.",
  mainImagePath: "projects/python/python-image-one", 
  sections: [
    // each section will be its own object
    {
      "Title" : "",
      // create an array for the structure which hold objects
      "structure" : [
        // check the type front end and render the approriate component
        { "type":"image", "src":"../", "position": 1 },
        { "type":"text", "text":"Lorem Ipsum", "position":3 },
        { "type":"title", "text":"Lorem Ipsum", "position":2 }
      ]
    }
  ],
  "projectHeaderImage" : "projects/python/phone.png"

})



// SHOULD THIS BE TRIGGERED AT AN ENDPOINT?
// CREATES A MONGOOSE SERVER CONNECTION PROMISE  
mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true})

 .then(() => {
    console.log('Database connection successful')
    newProject.save(function (err, project) {
      if (err) return console.error(err);
      console.error("Project: " + newProject.projectName + " was added successfully");
    });
 })

 .catch(err => {
   console.error('Database connection error')
 })

 mongoose.connection.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
});

 


