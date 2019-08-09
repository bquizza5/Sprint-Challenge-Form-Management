import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'


const LoginForm = ({ errors, touched, }) => {

    return(
        <Form className='form'>
        <Field data-testid='name' type="text" name="name" placeholder="Username" />
            {touched.name && errors.name && (
            <p data-testid='nameError' className="error">{errors.name}</p>
            )}

        <Field data-testid='password' type="password" name="password" placeholder="password" />
            {touched.password && errors.password && <p data-testid='passwordError' className="error">{errors.password}</p>}

        <button data-testid='submitButton' type="submit">Submit!</button>
      </Form>
    )
}

const FormikOnboardingForm = withFormik({
    mapPropsToValues({ name, password }) {
      return {
        name: name || '',
        password: password || '',
      };
    },
  
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required(),
    }),
  
    handleSubmit(values) {
      axios
        .post('http://localhost:5000/api/register', {username: values.name, password: values.password})
        .then(res => {
            console.log(res)
            })
        .catch(err => console.log(err.response));
    }
  })(LoginForm);
  
  export default FormikOnboardingForm;