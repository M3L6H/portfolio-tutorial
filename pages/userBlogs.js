import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import { Container, Col, Row, Button } from "reactstrap";
import PortButtonDropdown from "../components/ButtonDropdown";

import withAuth from "../components/hoc/withAuth";
import { Link, Router } from "../routes";

import { getUserBlogs, updateBlog, deleteBlog } from "../actions";

class UserBlogs extends React.Component {

  static async getInitialProps({ req }) {
    let blogs = [];

    try {
      blogs = await getUserBlogs(req);
    } catch (err) {
      console.error(err);
    }

    return { blogs };
  }

  changeBlogStatus(status, blogId) {
    updateBlog({ status }, blogId)
      .then(status => {
        Router.pushRoute("/userBlogs");
      })
      .catch(err => {
        console.error(err.message);
      });
  }

  deleteBlogWarning(blogData) {
    const res = confirm("Are you sure you want to delete this blog post?");

    if (res) {
      this.deleteBlog(blogData);
    }
  }

  deleteBlog(blogData) {
    deleteBlog(blogData)
      .then(() => {
        Router.pushRoute("/userBlogs");
      })
      .catch(err => {
        console.error(err.message);
      });
  }

  separateBlogs(blogs) {
    const published = [];
    const drafts = [];

    blogs.forEach((blog) => {
      if (blog.status === "draft")
        drafts.push(blog);
      else if (blog.status === "published")
        published.push(blog)
      else
        console.error("Undefined blog status!");
    });

    return { published, drafts };
  }

  renderBlogs(blogs) {
    return (
      <ul className="user-blogs-list">
        { blogs.map((blog, index) => (
          <li key={ index }>
            <Link route={ `/blogs/${ blog._id }/edit` }>
              <a>{ blog.title }</a>
            </Link>
            <PortButtonDropdown items={ this.dropdownOptions(blog) } />
          </li>
        )) }
      </ul>
    );
  }

  createStatus(status) {
    return status === "draft" ? { view: "Publish Blog Post", value: "published" } : { view: "Make a Draft", value: "draft" };
  }

  dropdownOptions = (blog) => {
    const status = this.createStatus(blog.status);

    return [
      { text: status.view, handlers: { onClick: () => this.changeBlogStatus(status.value, blog._id) } },
      { text: "Delete post", handlers: { onClick: () => this.deleteBlogWarning(blog) } }
    ]
  }

  render() {
    const { blogs } = this.props;
    const { published, drafts } = this.separateBlogs(blogs);

    return (
      <BaseLayout headerType={ "landing" } { ...this.props.auth } >
        <div className="masthead" style={{ "backgroundImage": "url('/static/images/home-bg.jpg')" }}>
          <div className="overlay"></div>
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Blog Dashboard</h1>
                  <span className="subheading">
                    Manage your content... { " " }
                    <Link route="/blogs/new">
                      <Button color="primary">Create New Blog Post</Button>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-user-page">
          <Row>
            <Col className="mx-auto text-center" md="6">
              <h2 className="blog-status-title">
                Published Blog Posts
              </h2>
              { this.renderBlogs(published) }
            </Col>
            <Col className="mx-auto text-center" md="6">
              <h2 className="blog-status-title">
                Draft Blog Posts
              </h2>
              { this.renderBlogs(drafts) }
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth("siteOwner")(UserBlogs);