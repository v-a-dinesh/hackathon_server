const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI);

	const db = mongoose.connection;

	db.on("connected", () => console.log("MongoDB Server connected"));

	db.on("disconnected", () => {
		console.log("mongodb disconnected");
		setTimeout(() => {
			mongoose.connect(process.env.MONGODB_URI)
				.then(() => {
					console.log("mongodb connected after disconnected.")
				})
				.catch(() => {
					console.log("error occured while reconnecting");
				})
		}, 5000);
	});

	db.on("reconnected", () => console.log("mongodb reconnected"));

	db.on("error", () => console.log("error occured while connecting to mongodb"));
};

module.exports = connectDB;
