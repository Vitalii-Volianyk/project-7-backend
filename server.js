const app = require("./app");
const mongoose = require("mongoose");

app.listen(3000, () => {
	console.log("Server running. Use our API on port: 3000");
});

const main = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://smisyuk:ser198@sm-dev.mlsnh80.mongodb.net/so-yammy"
		);
		console.log("Database connection successful");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

main();
