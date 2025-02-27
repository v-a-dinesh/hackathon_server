const Discussion = require("../models/Discussion");

exports.insertMany = async (data) => {
    try {
        let res = await Discussion.insertMany(data);
        return { status: "ok", data: res };
    } catch (err) {
        console.log(err)
        return { status: "error", data: err };
    }
};

exports.updateMany = async (criteria, updatedInfo) => {
    try {
        let res = await Discussion.updateMany(criteria, updatedInfo);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};

exports.find = async (criteria, projection = {}) => {
    try {
        let res = await Discussion.find(criteria, projection)
                                .populate('author', 'name email')
                                .populate('categoryId');
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};

exports.deleteMany = async (criteria) => {
    try {
        let res = await Discussion.deleteMany(criteria);
        return { status: "ok", data: res };
    } catch (err) {
        return { status: "error", data: err };
    }
};