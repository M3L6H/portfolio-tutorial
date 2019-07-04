import React from "react";
import ProjectCardDetail from "./projectCardDetail";
import { Button, Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";

export default class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { project, children } = this.props;
    const { isOpen } = this.state;

    return (
      <span onClick={ this.handleToggle }>
        <ProjectCardDetail toggle={ this.handleToggle } project={ project } isOpen={ isOpen } />
        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header">{ project.position }</CardHeader>
          <CardBody>
            <p className="portfolio-card-city">{ project.location }</p>
            <CardTitle className="portfolio-card-title">{ project.title }</CardTitle>
            <CardText className="portfolio-card-text">{ project.description }</CardText>
            <div className="read-more">
              { children }
            </div>
          </CardBody>
        </Card>
      </span>
    );
  }

}