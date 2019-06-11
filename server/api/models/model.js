const mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'learning_mongodb';

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
    {
      title: String,
      text: String,
      images: [ String ]
    }
  ]
})

// CREATE THE PROJECT MODEL USING THE SCHEMA
const projectModel = mongoose.model('Project', projectSchema)

// MAKE THIS DATA AVAILABLE THROUGH A UI - LATER 
// ADD THE REQUIRED DATA FOR UPLOADING TO THE DATABASE
const newProject = new projectModel({
  projectName: "Python",
  titleIntro: "",
  titleMain: "Python Scripting",
  position: 1,
  summary: "Learning how to program with Python benefitted me greatly working within the field of Architecture. The language was able to interact with the major 3D CAD program ‘Revit’ in order to automate tasks, greatly improving efficiency and opened the ability to explore parametrically designed concepts.",
  mainImagePath: "projects/python/python-image-one", 
  sections: [
    {
      title: ".PY",
      text: "My ability to automate a wide array of tasks within the field of Architecture gave me an edge over other technicians in Cardiff. I recognized the importance of this skill early on and am constantly looking out for intuitive ways to implement new technologies in my everyday tasks at the office. Most recently developing a system of extracting hundreds of 2D points from site surveys and converting them to a more useful 3D file.",
      images: [ 
        "projects/python/python-image-two.jpg", 
        "projects/python/python-image-three.jpg", 
        "projects/python/python-image-four.jpg" 
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

 


