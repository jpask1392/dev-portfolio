const mongoose = require('mongoose');
const server = '127.0.0.1:27017';
const database = 'projectsDB';

// run node ./server/api/models/model.js

// create a type schema 
const sectionsSchema = new mongoose.Schema(
	{ type: Object, _id: false }, 
	{ discriminatorKey: 'type' })

const projectSchema = new mongoose.Schema({ 
	projectName: {type: String, required: true},
	mainImagePath: String,
	position: Number,
	sections: [ sectionsSchema ], 
})

projectSchema.path('sections')
	.discriminator(
		'image', 
		new mongoose.Schema({
			_id: false,
			src: {type: String, required: true},
			caption: {type: String}
		})
	)

projectSchema.path('sections')
	.discriminator(
		'text', 
		new mongoose.Schema({
			_id: false,
			text: {type: String, required: true}
		})
	)

projectSchema.path('sections')
	.discriminator(
		'title', 
		new mongoose.Schema({
			_id: false,
			text: {type: String, required: true}
		})
	)

projectSchema.path('sections')
	.discriminator(
		'gistCode', 
		new mongoose.Schema({
			_id: false,
			gist: {type: String, required: true},
			file: String
		})
	)

export const projectModel = mongoose.model('Project', projectSchema)

// EXAMPLE 
let newProject = new projectModel({
	projectName: "TEST",
	mainImagePath: "./",
	position: 1,
	sections: 
		[
			{ 
				type: 'image', // this is needed for selection
				src: './'
			}, 
			{
				type: 'gistCode',
				gist: "db60274212f52b00b18693bcdb335f88"
			}
		]
})


// SHOULD THIS BE TRIGGERED AT AN ENDPOINT?
// CREATES A MONGOOSE SERVER CONNECTION PROMISE  
// mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true})
// 	.then(() => {
// 		console.log('Database connection successful')
// 		newProject.save(function (err, project) {
// 			if (err) return console.error(err.message);
// 			console.error("Project: " + newProject.projectName + " was added successfully");
// 			});
// 		}).catch(err => {
// 		console.error('Database connection error')
// 	})


// mongoose.connection.on('disconnected', function(){
// 	console.log("Mongoose default connection is disconnected");
// });

 


