import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'


const LoginForm = ({ errors, touched, status }) => {
    const [ users, setUsers ] = useState([])

    useEffect(() => {
    
    if (status) {
      setUsers([...users, status])
    }
    }, [status]);

    return(
        <>
        <Form className='form'>
        <Field data-testid='name' type="text" name="name" placeholder="Username" />
            {touched.name && errors.name && (
            <p data-testid='nameError' className="error">{errors.name}</p>
            )}

        <Field data-testid='password' type="password" name="password" placeholder="password" />
            {touched.password && errors.password && <p data-testid='passwordError' className="error">{errors.password}</p>}

        <button data-testid='submitButton' type="submit">Submit!</button>
      </Form>
      <div className='cards'>
      {
            users.map((user)=> {
            return(
                <div key={user.token} className='user-card'>
                    <p >{user.message}</p>
                    <p>Token: <span className='token'>{user.token}</span></p>
                </div>
            )})   
        }
        </div>
        </>
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
  
    handleSubmit(values, {setStatus}) {
      axios
        .post('http://localhost:5000/api/register', {username: values.name, password: values.password})
        .then(res => {
            console.log(res.data)
           
            setStatus(res.data);

            })
        .catch(err => console.log(err.response));
    }
  })(LoginForm);
  
  export default FormikOnboardingForm;