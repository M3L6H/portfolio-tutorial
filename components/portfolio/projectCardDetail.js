import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from "moment";

class ProjectCardDetail extends React.Component {
  render() {
    const { isOpen, toggle, project } = this.props;

    return (
      <div>
        <Modal isOpen={ isOpen } toggle={ toggle }>
          <ModalHeader toggle={ toggle }>{ project.title }</ModalHeader>
          <ModalBody>
            <p><b>Position: </b>{ project.position }</p>
            <p><b>Company: </b>{ project.company }</p>
            <p><b>Location: </b>{ project.location }</p>
            <p><b>Description: </b>{ project.description }</p>
            <p><b>Start Date: </b>{ moment(project.startDate).format("MMMM YYYY") }</p>
            <p><b>End Date: </b>{ project.endDate ? moment(project.endDate).format("MMMM YYYY") : "Ongoing" }</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={ toggle }>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ProjectCardDetail;