const routes = require("next-routes")

module.exports = routes()
  .add("projectNew", "/projects/new")
  .add("project", "/projects/:id")
  .add("projectEdit", "/projects/:id/edit")
  .add("blogEditor", "/blogs/new")
  .add("userBlogs", "/blogs/dashboard")
  .add("blogDetail", "/blogs/:slug")
  .add("blogEditorUpdate", "/blogs/:id/edit");