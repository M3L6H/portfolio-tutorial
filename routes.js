const routes = require("next-routes")

module.exports = routes()
  .add("project", "/projects/:id")
  .add("projectEdit", "/projects/:id/edit")
  .add("blogEditor", "/blogs/new")
  .add("blogDetail", "/blogs/:slug")
  .add("blogEditorUpdate", "/blogs/:id/edit");