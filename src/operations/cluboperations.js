const Clubs = require("../models/Clubs");
exports.insertMany = async (data) => {
    try {
        let res = await Clubs.insertMany(data);
        return { status: "ok", data: res };
    } catch (err) {
        console.log(err)
        return { status: "error", data: err };
    }
};

exports.updateMany = async (criteria, updatedInfo) => {
    try {
        let res = await Clubs.updateMany(criteria, updatedInfo);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};

exports.find = async (criteria, projection = {}) => {
    try {
        let res = await Clubs.find(criteria, projection);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};

exports.deleteMany = async (criteria) => {
    try {
        let res = await Clubs.deleteMany(criteria);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};