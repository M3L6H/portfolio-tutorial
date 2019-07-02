const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withProgressBar = require("next-progressbar");

module.exports = withProgressBar(withCss(withSass()));