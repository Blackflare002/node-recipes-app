let express = require("express");
let morgan = require("morgan");
let app = express();

app.use(morgan("tiny"));

app.get("/", (req, res) => {
	res
		.status(200)
		.json({ status: 200, message: "This is the server response" });
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
