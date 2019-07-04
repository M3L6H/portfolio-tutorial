import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import ProjectCreateForm from "../components/portfolio/projectCreateForm";

import { Row, Col } from "reactstrap";

import { getProjectById, updateProject } from "../actions";

import withAuth from "../components/hoc/withAuth";
import { Router } from "../routes";

class ProjectEdit extends React.Component {

  static async getInitialProps({ query }) {
    let project = {};

    try {
      project = await getProjectById(query.id);
    } catch (err) {
      console.error(err);
    }

    console.log(project);
    return { project };
  }

  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };

    this.updateProject = this.updateProject.bind(this);
  }

  updateProject(projectData, { setSubmitting }) {
    setSubmitting(true);

    updateProject(projectData)
      .then(project => {
        setSubmitting(false);
        this.setState({ error: undefined });
        Router.pushRoute("/portfolio");
      })
      .catch(err => {
        setSubmitting(false);
        const error = err.message || "Server error";
        this.setState({ error });
      });
  }

  render() {
    const { error } = this.state;
    const { project } = this.props;

    return (
      <BaseLayout { ...this.props.auth }>
        <BasePage className="portfolio-create-page" title="Update Project">
          <Row>
            <Col md="6">
              <ProjectCreateForm
                initialValues={ project }
                error={ error }
                onSubmit={ this.updateProject }
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth("siteOwner")(ProjectEdit);