const Project = require("../models/project");

exports.getProjects = (req, res) => {
  Project.find({})
    .sort({ "startDate": -1 })
    .exec((err, allProjects) => {
      if (err) return res.status(422).send(err);

      return res.json(allProjects);
    });
};

exports.getProjectById = (req, res) => {
  const projectId = req.params.id;

  Project.findById(projectId)
    .select("-__v")
    .exec((err, foundProject) => {
      if (err) return res.status(422).send(err);

      return res.json(foundProject);
    });
};

exports.saveProject = (req, res) => {
  const projectData = req.body;
  const userId = req.user && req.user.sub;
  const project = new Project(projectData);
  project.userId = userId;
  project.save((err, createdProject) => {
    if (err) return res.status(422).send(err);

    return res.json(createdProject);
  });
};

exports.updateProject = (req, res) => {
  const projectId = req.params.id;
  const projectData = req.body;

  Project.findById(projectId, (err, foundProject) => {
    if (err) return res.status(422).send(err);

    foundProject.set(projectData);
    foundProject.save((err, savedProject) => {
      if (err) return res.status(422).send(err);

      return res.json(savedProject);
    });
  })
};

exports.deleteProject = (req, res) => {
  const projectId = req.params.id;

  Project.deleteOne({ _id: projectId }, (err, deletedProject) => {
    if (err) return res.status(422).send(err);

    return res.json({ status: "DELETED" });
  });
};