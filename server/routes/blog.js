const express = require("express");
const router = express.Router();

const authService = require("../services/auth");

const blogCtrl = require("../controllers/blog");

// Endpoint to get the data of a specific blog post
router.get("", blogCtrl.getBlogs);

// Endpoint to get the data of a specific blog post
router.get("/me", authService.checkJWT, authService.checkRole("siteOwner"), blogCtrl.getUserBlogs);

// Endpoint to create a blog post
router.post("", authService.checkJWT, authService.checkRole("siteOwner"), blogCtrl.createBlog);

// Endpoint to get the data of a specific blog post
router.get("/:id", blogCtrl.getBlogById);

router.get("/s/:slug", blogCtrl.getBlogBySlug);

// Endpoint to update the data of a specific blog post
router.patch("/:id", authService.checkJWT, authService.checkRole("siteOwner"), blogCtrl.updateBlog);

router.delete("/:id", authService.checkJWT, authService.checkRole("siteOwner"), blogCtrl.deleteBlog);

module.exports = router;