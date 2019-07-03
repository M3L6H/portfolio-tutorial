import Axios from 'axios';
import React from 'react';
import { Link } from '../routes';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from "../components/BasePage";

class Portfolio extends React.Component {

  static async getInitialProps() {
    let posts = [];

    try {
      const response = await Axios.get("https://jsonplaceholder.typicode.com/posts");
      posts = response.data;
    } catch (e) {
      console.error(e);
    }

    return { posts: posts.splice(0, 10) };
  }

  renderPosts(posts) {
    return posts.map((post, index) => {
      return (
        <li key={ index } >
          <Link route={ `/projects/${ post.id }` }>
            <a>{ post.title }</a>
          </Link>
        </li>
      );
    });
  }

  render() {
    const { posts } = this.props;

    return (
      <BaseLayout { ...this.props.auth }>
        <BasePage>
          <h1>Portfolio</h1>
          <ul>{ this.renderPosts(posts) }</ul>
        </BasePage>
      </BaseLayout>
    )
  }

}

export default Portfolio;