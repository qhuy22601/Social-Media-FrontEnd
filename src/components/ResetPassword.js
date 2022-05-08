import React, {useState, Component } from 'react'
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



function ResetPassword(){
  
  function showFailMessage(inputMessage) {
    toast.error(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  let navigate = useNavigate();
  // const schemes= yup.object().shape({
  //   password:yup.string().required(),
  // });

  //   async function changePassword(inpPass){
  //     try{
  //       const response = await axios({
  //         method: 'post',
  //         url: 'api/auth/users/changepass',
  //         headers: {
  //           Authorization: localStorage.getItem('Token'),
  //         },
  //         data:{
  //             password:inpPass.password,
  //         }
  //       });
  //       if (response.data !== null && response.data.status === "that bai") {
  //           console.log("Loixo");
  //       }

  //       if( response.data !==null&&response.data.status === "thanh cong") {
  //           response.data.payload = response.data.payload.users.password;
  //           navigate("/profile");
  //       }

  //     }catch(e){
  //       showFailMessage("Loioix!");
  //     }
  //   }
  const [pass, setPass] = useState('')

  async function changePass(inpPass){
    try{
      const res = await axios({
        method: "put",
        url: "/api/auth/users/update",
        header:{
          Authorization:localStorage.getItem('Token'),
        },
        data:{
          pass:inpPass,
        },
      });
      if(res.data.status ==="thanh cong" && res.data!== null){
        showFailMessage("Thành công!");
        navigate("/newfeed");
      }
      if (res.data !== null && res.data.status === "that bai") {
        showFailMessage("Lỗi rồi!");
      }
    }catch(e){
      showFailMessage("lỗi rồi");
    }
  }

  async function handleChangePass(e) {
    e.preventDefault();
    changePass(pass);
  }
  
  function handlePassChange(e) {
    setPass(e.target.value);
  }



    return (
        <Container fluid className={styles.container}>
          <ToastContainer/>
         {/* <Formik
        validationSchema={schemes}
        initialValues={{
          password: "",
        }}
        onSubmit={(values, {setSubmitting}) => {
          changePassword(values);
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
        }) => ( */}
            <Form noValidate className={styles.formContainer} >
  
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="passinp">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="password"
                    value={pass}
                    onChange={handlePassChange}
                 
                  />
                  <Form.Control.Feedback type="invalid">
                    Nhập pass
                  </Form.Control.Feedback>
                </Form.Group>
                </Row>
              <Button type="submit" variant="primary" onClick={handleChangePass}>
                Đổi
              </Button>
            </Form>
        {/* )}
        </Formik> */}
      </Container>
    )
}
export default ResetPassword;
