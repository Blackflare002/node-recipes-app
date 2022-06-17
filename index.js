let express = require("express");
let morgan = require("morgan");
const bp = require("body-parser");
const data = require("./data.json");
let app = express();

app.use(morgan("tiny"));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

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

//returns the ingredients of a specified recipe and the number of steps
app.get("/recipes/details/:name", (req, res) => {
	let inputName = req.params.name;
	let theRecipe = data.recipes.find((el) => {
		return el.name === inputName;
	});
	if (theRecipe) {
		let ingredients = theRecipe.ingredients;
		// console.log(ingredients.length);
		let numSteps = ingredients.length;
		// console.log(numSteps);
		res.status(200).json({
			status: 200,
			message: "This is the server response",
			details: { ingredients, numSteps },
		});
	} else {
		res.status(200).json({
			status: 200,
			message: "This is the server response",
			details: {},
		});
	}
});

// Posts a new recipe
app.post("/recipes", (req, res) => {
	let theRecipes = data.recipes;
	let newRecipe = req.body;
	// console.log(req.body);
	let exists = theRecipes.find((el) => {
		return newRecipe.name === el.name;
	});
	if (exists) {
		// console.log("ping!");
		res.status(400).json({
			status: 400,
			message: "This is the server response.",
			error: "Recipe already exists",
		});
	} else {
		theRecipes.push(newRecipe);
		// console.log(addedRecipe);
		// console.log(theRecipes);
		res.status(201).json({
			status: 201,
			message: "This is the server response.",
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
