import path 				from 'path'
import { validations } 		from '../validations/emailValidations.js'
import bcrypt 				from 'bcryptjs';
import { 
	viewAllProjects, 
	projectById,
	handleEmail,
	getAllProjectId,
	viewRecentProjects } 
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

	// user authentication
	app.route('/users/authenticate') 
		.post((req, res) => {
			// expect this to return a promise
			// users will be stored in a database
			// var hash = bcrypt.hashSync("password", bcrypt.genSaltSync(10))

			// storing these in a hash table could produce a faster search time
			// the username would have to be unique for this to work
			const users = [
				{ 	id:1, 
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


