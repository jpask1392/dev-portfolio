const mongoose = require("mongoose")

// create a type schema
const sectionsSchema = new mongoose.Schema(
	{ type: Object, _id: false },
	{ discriminatorKey: "type" }
)

const projectSchema = new mongoose.Schema({
	projectName: { type: String, required: true },
	mainImagePath: String,
	position: Number,
	sections: [sectionsSchema]
})

projectSchema.path("sections").discriminator(
	"image",
	new mongoose.Schema({
		_id: false,
		src: { type: String, required: true },
		caption: { type: String }
	})
)

projectSchema.path("sections").discriminator(
	"text",
	new mongoose.Schema({
		_id: false,
		text: { type: String, required: true }
	})
)

projectSchema.path("sections").discriminator(
	"title",
	new mongoose.Schema({
		_id: false,
		text: { type: String, required: true }
	})
)

projectSchema.path("sections").discriminator(
	"gistCode",
	new mongoose.Schema({
		_id: false,
		gist: { type: String, required: true },
		file: String
	})
)

export const projectModel = mongoose.model("Project", projectSchema)

// EXAMPLE
// let newProject = new projectModel({
// 	projectName: "TEST",
// 	mainImagePath: "./",
// 	position: 1,
// 	sections: [
// 		{
// 			type: "image", // this is needed for selection
// 			src: "./"
// 		},
// 		{
// 			type: "gistCode",
// 			gist: "db60274212f52b00b18693bcdb335f88"
// 		}
// 	]
// })