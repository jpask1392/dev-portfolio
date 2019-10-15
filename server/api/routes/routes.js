import path from "path"
import { validations } from "../validations/emailValidations.js"
import {
	viewAllProjects,
	projectById,
	handleEmail,
	getAllProjectId,
	authenticateUser,
	editField,
	deleteProject,
	addProject
} from "../controllers/controller.js"

const routes = app => {
	var errList = {}

	// API END POINTS

	app.route("/api/projects")
		.get((req, res) => {
			viewAllProjects(req, res)
		})
		.put((req, res) => {
			editField(req, res)
		})
		.post((req, res) => {
			addProject(req, res)
		})

	app.route("/api/projects/:projectName")
		.get((req, res) => {
			errList = {}
			projectById(req, res)
		})
		.delete((req, res) => {
			deleteProject(req, res)
		})

	app.route("/api/projects/allIds").get((req, res) => {
		getAllProjectId(req, res)
	})

	app.route("api/section")
		.post((req, res) => {
			addSection(req, res)
		})
		.delete((req, res) => {
			deleteSection(req, res)
		})

	// user authentication
	app.route("/users/authenticate").post((req, res) => {
		authenticateUser(req, res)
	})

	app.route("/email/send").post((req, res) => {
		errList = validations(req)

		if (Object.keys(errList).length === 0) {
			handleEmail(req)
			var redir = { redirect: "/sent" }
			res.json(redir)
			console.log("no errors")
			// res.redirect('/sent')
		} else {
			res.send(errList)
		}
	})

	// ---------------------------

	// PAGE DIRECTION ROUTES
	app.route("/").get((req, res) => {
		//RESET ERROR LIST ON GET REQUEST
		errList = {}
		res.sendFile(path.resolve("./public/index.html"))
	})

	// want this to be project name -- not id 
	app.route("/projects/:_id").get((req, res) => {
		res.sendFile(path.resolve("./public/index.html"))
	})

	app.route("/sent").get((req, res) => {
		res.sendFile(path.resolve("./public/index.html"))
	})
}

export default routes
