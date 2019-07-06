const express = require("express");
const router = express.Router();

const authService = require("../services/auth");

const blogCtrl = require("../controllers/blog");

// Endpoint to create a blog post
router.post("", authService.checkJWT, authService.checkRole("siteOwner"), blogCtrl.createBlog);

// Endpoint to get the data of a specific blog post
router.get("/:id", blogCtrl.getBlogById);

module.exports = router;