const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    const errorTitle = Object.keys(constants).find(key => constants[key] === statusCode) || "Error";

    res.json({
        title: errorTitle,
        message: err?.message,
        stackTrace: process.env.NODE_ENV === "production" ? err?.stack : err?.stack,
    });
};
module.exports = errorHandler;


