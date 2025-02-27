const Event = require("../models/Event");

exports.insertMany = async (data) => {
    try {
        let res = await Event.insertMany(data);
        return { status: "ok", data: res };
    } catch (err) {
        console.log(err)
        return { status: "error", data: err };
    }
};

exports.updateMany = async (criteria, updatedInfo) => {
    try {
        let res = await Event.updateMany(criteria, updatedInfo);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};

exports.find = async (criteria, projection = {}) => {
    try {
        let res = await Event.find(criteria, projection);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};

exports.deleteMany = async (criteria) => {
    try {
        let res = await Event.deleteMany(criteria);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};