"use strict";

let path = require("path");

module.exports = {
    mode: "development",
    entry: "./js/script.js",
    output: {
        filename: "./dist/bundle.js",
        path: __dirname
    },
    watch: true,

    devtool: "source-map",

    module: {}
};
