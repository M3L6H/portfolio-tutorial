import React from "react";
import Typed from "react-typed";

import BaseLayout from "../components/layouts/BaseLayout";

import { Button, Col, Container, Row } from "reactstrap";

class Index extends React.Component {

  constructor(props) {
    super(props);

    this.roles = ["Developer", "Innovator", "Team-Player"];
  }

  // Renderer. Must be implemented from React.Component
  render() {
    return (
      <BaseLayout className="cover">
        <div className="main-section">
          <div className="background-image">
            <img src="/static/images/background-index.png"/>
          </div>

          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className="{`flipper`}">
                    <div className="back">
                      <div className="hero-section-content">
                        <h2>Full Stack Web Developer</h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img src="/static/images/section-1.png" alt="Developer on laptop" className="image"/>
                      <div className="shadow-custom">
                        <div className="shadow-inner"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="hero-welcome-wrapper" md="6">
                <div className="hero-welcome-text">
                  <h1>Michael Hollingworth's Portfolio</h1>
                  <h2>Get informed, collaborate, and discover the projects I have worked on throughout the years!</h2>
                </div>
                <Typed
                  loop
                  typeSpeed={70}
                  backSpeed={50}
                  strings={this.roles}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                  className="self-typed"
                />
                <div className="hero-welcome-bio">
                  <h2>Take a look at my work.</h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    )
  }

}

export default Index;