// custom dependencies
import routes from "./api/routes/routes"
var history = require("connect-history-api-fallback")

// dependencies
const express = require("express")
var compression = require("compression")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")

// variables
const PORT = process.env.PORT || 9000

app.use(
	bodyParser.urlencoded({
		extended: true
	})
)
app.use(compression())

app.use(bodyParser.json())

routes(app)

// use() for serving static files
app.use(history())
app.use("/assets", express.static("assets"))
app.use("/build", express.static("build"))
app.use(function(req, res, next) {
	res.status(404).sendFile(path.resolve("./public/index.html"))
})

const currentDateTime = new Date()

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} on ${currentDateTime}`)
})
