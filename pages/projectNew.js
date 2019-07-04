import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import ProjectCreateForm from "../components/portfolio/projectCreateForm";

import { Row, Col } from "reactstrap";

import { createProject } from "../actions";

import withAuth from "../components/hoc/withAuth";
import { Router } from "../routes";

const INITIAL_VALUES = {
  title: "",
  company: "",
  location: "",
  position: "",
  description: "",
  startDate: new Date(),
  endDate: new Date()
};

class ProjectNew extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };

    this.saveProject = this.saveProject.bind(this);
  }

  saveProject(projectData, { setSubmitting }) {
    setSubmitting(true);

    createProject(projectData)
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

    return (
      <BaseLayout { ...this.props.auth }>
        <BasePage className="portfolio-create-page" title="Create New Project">
          <Row>
            <Col md="6">
              <ProjectCreateForm
                initialValues={ INITIAL_VALUES }
                error={ error }
                onSubmit={ this.saveProject }
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth("siteOwner")(ProjectNew);