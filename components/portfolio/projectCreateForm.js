// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Alert, Button } from 'reactstrap';

import PortInput from "../form/PortInput";
import PortDate from "../form/PortDate";

const validateInputs = (values) => {
  let errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!value && key !== "endDate")
      errors[key] = `Field ${ key } is required!`;
  });

  const startDate = values.startDate && new Date(values.startDate);
  const endDate = values.endDate && new Date(values.endDate);

  if (startDate && endDate && endDate < startDate) {
    errors.endDate = "End date cannot be before start date!";
  }

  return errors;
}

const ProjectCreateForm = ({ initialValues, onSubmit, error }) => (
  <div>
    <Formik
      initialValues={ initialValues }
      validate={ validateInputs }
      onSubmit={ onSubmit }
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" label="Title" name="title" component={ PortInput } />
          <Field type="text" label="Company" name="company" component={ PortInput } />
          <Field type="text" label="Location" name="location" component={ PortInput } />
          <Field type="text" label="Position" name="position" component={ PortInput } />

          <Field type="textarea" label="Description" name="description" component={ PortInput } />

          <Field
            label="Start Date"
            name="startDate"
            initialDate={ initialValues.startDate }
            component={ PortDate }
          />
          <Field
            label="End Date"
            name="endDate"
            canBeDisabled={ true }
            initialDate={ initialValues.endDate }
            component={ PortDate }
          />

          { error && <Alert color="danger">{ error }</Alert> }

          <Button type="submit" color="success" size="lg" disabled={isSubmitting}>
            Create Project
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ProjectCreateForm;