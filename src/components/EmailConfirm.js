import React, { Component } from 'react'
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./styles/SignUp.module.css";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";



export class EmailConfirm extends Component{
render(){
    return (
        <Container fluid className={styles.container}>
        
            <Form className={styles.formContainer}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="emailInp">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder='email'
                    onChange={e =>this.email = e.target.value}
                  />
                  <Form.Control.Feedback type="invalid">
                    Nhập email
                  </Form.Control.Feedback>
                </Form.Group>
                </Row>
              <Button type="submit" variant="primary">
                Gửi
              </Button>
            </Form>
       
       
      </Container>
    )
};
}


