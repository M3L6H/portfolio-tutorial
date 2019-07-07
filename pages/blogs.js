import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from "../components/BasePage";

import { Container, Col, Row } from "reactstrap";
import { Link } from "../routes";
import { getBlogs } from "../actions";
import moment from "moment";

import { shortenText } from "../helpers/utils";

class Blogs extends React.Component {

  static async getInitialProps({ req }) {
    let blogs = [];

    try {
      blogs = await getBlogs(req);
    } catch (err) {
      console.error(err.message);
    }

    return { blogs };
  }

  renderBlogs(blogs) {
    return (
      <React.Fragment>
        { blogs.map((blog, index) => (
          <div key={ index } className="post-preview">
            <Link route={ `/blogs/${ blog.slug }` }>
              <a>
                <h2 className="post-title">{ shortenText(blog.title, 48) }</h2>
                <h3 className="post-subtitle">{ shortenText(blog.subTitle) }</h3>
              </a>
            </Link>
            <p className="post-meta">
              Posted by <a href="#">{ blog.author }</a> { moment(blog.createdAt).format("LL") }
            </p>
          </div>
        )) }
      </React.Fragment>
    );
  }

  render() {
    const { blogs } = this.props;

    return (
      <BaseLayout className="blog-listing-page" headerType={ "landing" } { ...this.props.auth } >
        <div className="masthead" style={{ "backgroundImage": "url('/static/images/home-bg.jpg')" }}>
          <div className="overlay"></div>
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Blog Posts</h1>
                  <span className="subheading">Programming, designing, creating...</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <BasePage className="blog-body">
          <Row>
            <Col className="mx-auto" md="10" lg="8">
              { this.renderBlogs(blogs) }
              <div className="clearfix">
                <a href="#" className="btn btn-primary float-right">Older Posts &rarr;</a>
              </div>
            </Col>
          </Row>

          <footer>
            <Container>
              <Row>
                <div className="col-lg-8 col-md-10 mx-auto">
                  <ul className="list-inline text-center">
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p className="copyright text-muted">Copyright &copy; Michael Hollingworth 2019</p>
                </div>
              </Row>
            </Container>
          </footer>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default Blogs;