const Announcement = require("../models/Announcement");

exports.insertMany = async (data) => {
    try {
        let res = await Announcement.insertMany(data);
        return { status: "ok", data: res };
    } catch (err) {
        console.log(err)
        return { status: "error", data: err };
    }
};

exports.updateMany = async (criteria, updatedInfo) => {
    try {
        let res = await Announcement.updateMany(criteria, updatedInfo);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};

exports.find = async (criteria, projection = {}) => {
    try {
        let res = await Announcement.find(criteria, projection);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};

exports.deleteMany = async (criteria) => {
    try {
        let res = await Announcement.deleteMany(criteria);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};