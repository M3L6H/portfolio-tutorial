const Blog = require("../models/blog");
const slugify = require('slugify');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

exports.getBlogs = (req, res) => {
  Blog
    .find({ status: "published" })
    .sort({ "createdAt": -1 })
    .exec((err, publishedBlogs) => {
      if (err) return res.status(422).send(err);

      return res.json(publishedBlogs);
    });
};

exports.getBlogBySlug = (req, res) => {
  const slug = req.params.slug;

  Blog.findOne({ slug }, (err, foundBlog) => {
    if (err) return res.status(422).send(err);

    return res.json(foundBlog);
  });
};

exports.createBlog = (req, res) => {
  const lockId = req.query.lockId;

  if (lock.isBusy(lockId)) {
    return res.status(422).send({ message: "Blog post is saving" });
  }

  lock.acquire(lockId, done => {
    const blogData = req.body;
    const userId = req.user && req.user.sub;
    const author = req.user && req.user.name;
    const blog = new Blog(blogData);

    blog.userId = userId;
    blog.author = author;
    blog.save((err, createdBlog) => {
      setTimeout(() => done(), 5000);

      if (err) return res.status(422).send(err);

      return res.json(createdBlog);
    });
  }, (err, ret) => {
    err && console.error(err);
  });
};

exports.getUserBlogs = (req, res) => {
  const userId = req.user.sub;

  Blog.find({ userId }, (err, userBlogs) => {
    if (err) return res.status(422).send(err);

    return res.json(userBlogs);
  });
};

exports.getBlogById = (req, res) => {
  const blogId = req.params.id;

  Blog.findById(blogId)
    .select("-__v")
    .exec((err, foundBlog) => {
      if (err) return res.status(422).send(err);

      return res.json(foundBlog);
    });
};

exports.updateBlog = (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;

  blogData.updatedAt = Date.now();

  Blog.findById(blogId, (err, foundBlog) => {
    if (err) return res.status(422).send(err);

    if (blogData.status && blogData.status === "published" && !foundBlog.slug) {
      foundBlog.slug = slugify(foundBlog.title, {
        replacement: '-',
        remove: null,
        lower: true
      });
    }

    foundBlog.set(blogData);
    foundBlog.save((err, savedBlog) => {
      if (err) return res.status(422).send(err);

      return res.json(savedBlog);
    });
  });
};

exports.deleteBlog = (req, res) => {
  const blogId = req.params.id;

  Blog.deleteOne({ _id: blogId }, err => {
    if (err) return res.status(422).send(err);

    res.json({ status: "deleted" });
  });
}