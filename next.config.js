const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withProgressBar = require("next-progressbar");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = withProgressBar(withCss(withSass({
  webpack(config, { dev }) {
    if (config.mode === "production") {
      if (Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
      }
    }
    return config;
  }
})));