let express = require("express");
let morgan = require("morgan");
const data = require("./data.json");
let app = express();

app.use(morgan("tiny"));

// basic endpoint for testing
app.get("/", (req, res) => {
	res
		.status(200)
		.json({ status: 200, message: "This is the server response" });
});

// returns the names of the recipes
app.get("/recipes", (req, res) => {
	let names = {
		recipeNames: ["scrambledEggs", "garlicPasta", "chai"],
	};
	res.status(200).json({
		status: 200,
		message: "This is the server response",
		data: names,
	});
});

app.get("/recipes/details/:name", (req, res) => {
	let inputName = req.params.name;
	// console.log(typeof inputName);
	let dataRecipesName = data.recipes.map((el) => {
		// console.log(el.name);
		return el.name;
	});
	let dataRecipes = data.recipes.map((el) => {
		let data = el.ingredients + " // ";
		data += el.instructions + " // ";
		return data;
	});
	// console.log(dataRecipes);
	let result = null;
	if (dataRecipesName.includes(inputName)) {
		result = dataRecipes;
		res.status(200).json({
			status: 200,
			message: "This is the server response",
			data: result,
		});
	} else {
		result = "{}";
		res.status(200).json({
			status: 200,
			message: "This is the server response",
			data: result,
		});
	}
});

// this is our catch all endpoint.
app.get("*", (req, res) => {
	res.status(404).json({
		status: 404,
		message: "This is obviously not what you are looking for.",
	});
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
