const path = require("path");

module.exports = {
  entry: [
    "./js/main.js",
    "./js/move.js",
    "./js/form.js",
    "./js/file.js",
    "./js/debounce.js",
    "./js/backend.js",
    "./js/picture.js",
    "./js/preview.js",
    "./js/filters.js",
    "./js/gallery.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
