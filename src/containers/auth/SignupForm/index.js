import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { Button } from 'components/common';
import { InputField } from 'components/form';
import firebase from 'services/firebase';
import notifier from 'utils/notifier';
import validationSchema from './schema';

class SignupForm extends Component {
  handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);
    } catch (e) {
      notifier.error(e.message);
      actions.setSubmitting(false);
    }
  };

  renderForm = ({ isSubmitting }) => {
    return (
      <Form>
        <Field component={InputField} name="email" type="email" label="Email" />
        <Field
          component={InputField}
          name="password"
          type="password"
          label="Password"
        />
        <Field
          component={InputField}
          name="passwordConfirm"
          type="password"
          label="Confirm Password"
        />
        <Box display="flex" alignItems="center" mt={2}>
          <Button mr={2} type="submit" loading={isSubmitting}>
            Sign Up
          </Button>
          <Link component={RouterLink} to="/login">
            Log In
          </Link>
        </Box>
      </Form>
    );
  };

  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '', passwordConfirm: '' }}
        onSubmit={this.handleSubmit}
        validationSchema={validationSchema}
        render={this.renderForm}
      />
    );
  }
}

export default SignupForm;
