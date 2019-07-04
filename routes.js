const routes = require("next-routes")

module.exports = routes()
  .add("project", "/projects/:id")
  .add("projectEdit", "/projects/:id/edit");