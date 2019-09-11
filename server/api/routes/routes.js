import path 				from 'path'
import { validations } 		from '../validations/emailValidations.js'
import bcrypt 				from 'bcryptjs';
import { 
	viewAllProjects, 
	projectById,
	handleEmail,
	getAllProjectId,
	viewRecentProjects,
	authenticateUser,
	editField,
	deleteProject,
	addSection,
	deleteSection,
	addProject } 
from '../controllers/controller.js';

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

	app.route('/api/recentprojects')
		.get((req, res) => {
			viewRecentProjects(req, res);
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

	app.route('/api/edit')
		.post((req, res) => {
			editField(req, res)
		})

	app.route('/api/delete/:id')
		.delete((req, res) => {
			deleteProject(req, res)
		})

	app.route('/api/addNewProject')
		.post((req, res) => {
			addProject(req, res)
		})


	// can combine the sections into one endpoint?
	app.route('/api/addSection')
		.post((req, res) => {
			addSection(req, res)
		})

	app.route('/api/deleteSection')
		.delete((req, res) => {
			deleteSection(req, res)
		})

	// user authentication
	app.route('/users/authenticate') 
		.post((req, res) => {
			authenticateUser(req, res);
		})

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


