const express = require("express");
const path = require("path");
const next = require("next");
const routes = require("../routes");
const mongoose = require("mongoose");

// Services
const authService = require("./services/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require("./config");

const Book = require("./models/book");
const bodyParser = require("body-parser");

const bookRoutes = require("./routes/book");
const projectRoutes = require("./routes/project");
const blogRoutes = require("./routes/blog");

const robotsOptions = {
  root: path.join(__dirname, "../static"),
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  }
};

const secretData = [{
    title: "Secret Data 1",
    description: "Plans 1"
  },
  {
    title: "Secret Data 2",
    description: "Plans 2"
  }
];

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.err(err));

// async () => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true }))();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());

    server.use("/api/v1/books", bookRoutes);
    server.use("/api/v1/portfolio", projectRoutes);
    server.use("/api/v1/blogs", blogRoutes);

    server.get("/robots.txt", (req, res) => {
      return res.status(200).sendFile("robots.txt", robotsOptions);
    })

    server.get("/api/v1/secret", authService.checkJWT, (req, res) => {
      return res.json(secretData);
    });

    server.get("/api/v1/ownersecret", authService.checkJWT, authService.checkRole("siteOwner"), (req, res) => {
      return res.json(secretData);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.use(function (err, req, res, next) {
      if (err.name === "UnauthorizedError")
        res.status(401).send({ title: "Unauthorized", detail: "Unauthorized access. Try logging in" });
    });

    server.use(handle).listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });