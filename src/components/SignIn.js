import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

import { RiLoginBoxLine } from "react-icons/ri";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import styles from "./styles/SignIn.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const [resData, setResData] = useState(null);

  let navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  async function postSignInInfo(inputData) {
    const response = await axios({
      method: "post",
      url: "/api/auth/users/signin",
      data: {
        email: inputData.email,
        password: inputData.password,
      },
    });
    
    if (response.data !== null && response.data.status === "that bai") {
      showWarningToast(response.data.message);
    }
    
    if (response.data !== null && response.data.status === "thanh cong") {
      setResData(response.data);
      
      localStorage.setItem("UserId", response.data.payload.user.id);
      localStorage.setItem("UserFirstName", response.data.payload.user.firstName);
      localStorage.setItem("UserLastName", response.data.payload.user.lastName);
      localStorage.setItem("UserEmail", response.data.payload.user.email);
      localStorage.setItem("UserAvata", response.data.payload.user.avata);
      localStorage.setItem("Token", response.data.payload.token);
      navigate("/newsfeed");
    }

  }

  function showWarningToast(inputMessage) {
    toast.warn("Invalid email or password", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log("toast");
  }

  return (
    <Container fluid className={styles.container}>
      <ToastContainer />
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, {setSubmitting}) => {
          postSignInInfo(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={styles.formContainer}
          >

<Grid>
            <Paper className='paper_logo' elevation={10}>
                <Grid className='grid_logo'>
                     <h2>Sign In</h2>
                </Grid>
                <Form.Group as={Col} md="12" controlId="signInEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                className="text_field" 
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && errors.email}
                placeholder='Enter email' required />
                 <Form.Control.Feedback type="invalid">
                 Nhập email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="signInPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                className="text_field" 
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && errors.password}
                placeholder='Enter username' required />
                 <Form.Control.Feedback type="invalid">
                 Nhập Password
                </Form.Control.Feedback>
              </Form.Group>
                
                <Button className='btnSubmit'  type='submit' color="primary" variant='contained'>Sign in</Button>

                <div className="link">
                    <Typography>
                        <Link to='/forgot'>Forgot password?</Link>
                    </Typography>
                    <Typography> Do you have an account?
                        <Link to='/signup'>Sign Up?</Link>
                    </Typography>
                </div>
            </Paper>
        </Grid>
            
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default SignIn;
