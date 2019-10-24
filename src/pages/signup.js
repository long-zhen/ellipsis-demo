import React from 'react';
import AuthLayout from 'containers/layout/AuthLayout';
import SignupForm from 'containers/auth/SignupForm';

function Signup() {
  return (
    <AuthLayout title="Sign Up">
      <SignupForm />
    </AuthLayout>
  );
}

export default Signup;
