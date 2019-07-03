import Axios from 'axios';
import React from 'react';
import { withRouter } from 'next/router';
import BaseLayout from '../components/layouts/BaseLayout';

class Project extends React.Component {

  static async getInitialProps({ query }) {
    const projectId = query.id;
    let project = {};

    try {
      const response = await Axios.get(`https://jsonplaceholder.typicode.com/posts/${ projectId }`);
      project = response.data;
    } catch (e) {
      console.error(e);
    }

    return { project };
  }

  render() {
    const { project } = this.props;

    return (
      <BaseLayout { ...this.props.auth }>
        <h1>{ project.title }</h1>
        <p>{ project.body }</p>
      </BaseLayout>
    )
  }

}

export default withRouter(Project);