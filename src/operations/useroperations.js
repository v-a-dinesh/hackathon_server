const {User} = require("../models/User");

exports.insertMany = async (data) => {
	try {
		let res = await User.insertMany(data);
		return { status: "ok", data: res };
	} catch (err) {
		return { status: "error", data: err };
	}
};

exports.updateMany = async (criteria, updatedInfo) => {
	try {
		let res = await User.updateMany(criteria, updatedInfo);
		return { status: "ok", data: res };
	} catch (err) {
		return { status: "error", data: err };
	}
};

exports.find = async (criteria, projection = {}) => {
	try {
		let res = await User.find(criteria, projection);
		return { status: "ok", data: res };
	} catch (err) {
		return { status: "error", data: err };
	}
};

exports.deleteMany = async (criteria) => {
	try {
		let res = await User.deleteMany(criteria);
		return { status: "ok", data: res };
	} catch (err) {
		return { status: "error", data: err };
	}
};

