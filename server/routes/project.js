const express = require("express");
const router = express.Router();

const authService = require("../services/auth");

const projectCtrl = require("../controllers/project");

// Endpoint to create a project
router.post("", authService.checkJWT, authService.checkRole("siteOwner"), projectCtrl.saveProject);

// Endpoint to get all projects
router.get("", projectCtrl.getProjects);

// Endpoint to get the data of a specific project
router.get("/:id", projectCtrl.getProjectById);

// Endpoint to update the data in a project
router.patch("/:id", authService.checkJWT, authService.checkRole("siteOwner"), projectCtrl.updateProject);

// Endpoint to delete a project from the database
router.delete("/:id", authService.checkJWT, authService.checkRole("siteOwner"), projectCtrl.deleteProject);

module.exports = router;