import React from 'react';
import { Link } from '../routes';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from "../components/BasePage";

import { Button, Col, Row } from "reactstrap";
import ProjectCard from "../components/portfolio/projectCard";

import { Router } from "../routes";

import { getProjects, deleteProject } from "../actions";

class Portfolio extends React.Component {

  static async getInitialProps() {
    let projects = [];

    try {
      projects = await getProjects();
    } catch (err) {
      console.error(err);
    }

    return { projects: projects };
  }

  navigateToEdit(projectId, e) {
    e.stopPropagation();
    Router.pushRoute(`/projects/${ projectId }/edit`)
  }

  displayDeleteWarning(projectId, e) {
    e.stopPropagation();
    const isConfirmed = window.confirm("Are you sure you want to delete this project?");

    if (isConfirmed) {
      this.deletePortfolio(projectId);
    }
  }

  deletePortfolio(projectId) {
    deleteProject(projectId)
      .then(() => {
        Router.pushRoute("/portfolio");
      })
      .catch(err => console.error(err));
  }

  renderProjects(projects) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return projects.map((project, index) => {
      return (
        <Col key={ index } md="4">
          <ProjectCard project={ project }>
            { isAuthenticated && isSiteOwner &&
              <React.Fragment>
                <Button
                  color="warning"
                  onClick={ (e) => this.navigateToEdit(project._id, e) }
                >Edit</Button>{" "}
                <Button
                  color="danger"
                  onClick={ (e) => this.displayDeleteWarning(project, e) }
                >Delete</Button>
              </React.Fragment>
            }
          </ProjectCard>
        </Col>
      );
    });
  }

  render() {
    const { projects } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return (
      <BaseLayout { ...this.props.auth } title="Learn About My Experience" >
        <BasePage className="portfolio-page" title="Portfolio">
          { isAuthenticated && isSiteOwner && <Button
            className="create-project-btn"
            color="success"
            onClick={ () => Router.pushRoute("/projects/new") }
          >Create Project</Button>
          }
          <Row>{ this.renderProjects(projects) }</Row>
        </BasePage>
      </BaseLayout>
    )
  }

}

export default Portfolio;