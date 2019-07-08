import path from 'path'
import { 
	viewAllProjects, 
	projectById,
	handleEmail,
	getAllProjectId } 
from '../controllers/controller.js';
import {validations} from '../validations/emailValidations.js'

// var session = require('express-session')

const routes = (app) => {

	var n = __dirname.indexOf("server")
	var rootDirectory = __dirname

	var errList = {};

	// ---------------------------

	// DATA COLLECTION ROUTES 

	// GET ALL PROJECTS
	app.route('/api/projects')
		.get((req, res) => {
			viewAllProjects(req, res);
		}) 

	app.route('/api/projects/allIds')
		.get((req, res) => {
			getAllProjectId(req, res);
		}) 

	app.route('/api/projects/:_id')
		.get((req, res) => {
			// RESET ERROR LIST
			errList = {}
			projectById(req, res);
		}) 

		.delete((req, res) => {
			res.send("DELETE request successful")
		})

	// AXIOS AJAX REQUEST TO THIS ENDPOINT 
	app.route('/email/send')
		.post((req, res) => {
			errList = validations(req);

			console.log(Object.keys(errList).length)

			if(Object.keys(errList).length === 0){
				handleEmail(req);
				var redir = { redirect: "/sent" };
        		res.json(redir);
				console.log("no errors")
				// res.redirect('/sent')
			} else {
				res.send(errList)
			}
		})

	// ---------------------------

	// PAGE DIRECTION ROUTES
	app.route('/') 
		.get((req, res) => {
			//RESET ERROR LIST ON GET REQUEST
			errList = {}
			res.sendFile(path.resolve("./public/index.html"));
		})

	app.route('/projects/:_id')
		.get((req, res) => { 
		res.sendFile(path.resolve("./public/index.html"));
	}) 

	app.route('/sent') 
		.get((req, res) => {
		res.sendFile(path.resolve("./public/index.html"));
	})

	// TODO SET DEFAULT IF ROUTE DOESN'T EXIST
	

}

export default routes;


