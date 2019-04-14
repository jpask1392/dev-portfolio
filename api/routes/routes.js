const routes = (app) => {

	app.route('/api/project')
	.get((req, res) => {
		// middleware is a function that has access to the req and res variables! 
		res.send("GET request successful")
	}) 

	.post((req, res) => {
		res.send("POST request successful")
	})

	app.route('/api/project:projectID')
	.put((req, res) => {
		res.send("PUT request successful")
	}) 

	.delete((req, res) => {
		res.send("DELETE request successful")
	})

}

export default routes;