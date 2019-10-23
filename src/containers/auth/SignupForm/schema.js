import { object, string, ref } from 'yup';

export default object().shape({
  email: string()
    .email('Invalid email')
    .required('Email is required'),
  password: string().required('Password is required'),
  passwordConfirm: string().oneOf([ref('password')], 'Password does not match')
});
