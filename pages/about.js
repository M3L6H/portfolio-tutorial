import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import { Col, Row } from "reactstrap";

class About extends React.Component {
  render() {
    return (
      <BaseLayout { ...this.props.auth } title="Learn About Me" >
        <BasePage className="about-page">
          <Row className="mt-5">
            <Col md="6">
              <div className="left-side">
                <h1 className="title fadein">Welcome,</h1>
                <h4 className="subtitle fadein">To the About Page</h4>
                <p className="subsubTitle fadein">
                  Learn about my background, interests, and goals.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className="body fadein">
                <p>
                  My name is Michael Hollingworth and I am a software engineer and freelance developer.
                </p>
                <p>
                  I graduated from the University of California, San Diego with a Bachelor of Science in Mathematics-Computer Science. I have been programming for more than 7 years and done both professional and personal work.
                </p>
                <p>
                  I am a dedicated hard-worker and always ready to learn. My hope is to apply the knowledge I have gained to a full time position in the industry doing what I love.
                </p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default About;