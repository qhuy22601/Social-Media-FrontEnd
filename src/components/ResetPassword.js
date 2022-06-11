import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles/SignIn.module.css";


function ResetPassword() {
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
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

  const[resData, setResData] = useState(null);

  let navigate = useNavigate();


  function handleChange(e){
    e.preventDefault();
    setFirstName( e.target.value);
    
  }
  function handle(e){
    e.preventDefault();
    setLastName( e.target.value);
  }

  //     }catch(e){
  //       showFailMessage("Loioix!");
  //     }
  //   }
  const [pass, setPass] = useState("");

  async function changePass(inpPass) {
    try {
      const res = await axios({
        method: "put",
        url: "/api/auth/users/update",
        header: {
          Authorization: localStorage.getItem("Token"),
        },
        data: {
          pass: inpPass,
        },
      });
      if (res.data.status === "thanh cong" && res.data !== null) {
        showFailMessage("Thành công!");
        navigate("/newfeed");
      }

      if (res.data !== null && res.data.status === "that bai") {
        console.log("Lỗi rồi!");
      }

    } catch (e) {
      showFailMessage("lỗi rồi");
    }
    

  }
  async function changeName(inputData){

    const res = await axios({
      method: "put",
      url: "/api/auth/users/change/" + localStorage.getItem("UserId"),
      header:{
        Authorization:localStorage.getItem('Token'),
      },
      data:{
        firstName : inputData.firstName,
        lastName: inputData.lastName,
      },
    });
    if (res.data !== null && res.data.status === "that bai") {
      console.log("Lỗi rồi!");
    }
    if(res.data.status ==="thanh cong" && res.data!== null){
      setResData(res.data);
      localStorage.removeItem("UserFirstName");
      localStorage.removeItem("UserLastName");
      localStorage.setItem("UserLastName", res.data.payload.user.lastName);
      localStorage.setItem("UserFirstName", res.data.payload.user.firstName);
      // navigate("/newfeed");
    }

  }
  return (
  <div>
    <form >
      <input 
       
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder='Enter firstName'
       />
       <input
        
          type="text"
          name="lastName"
          value={lastName}
          onChange={handle}
          placeholder='Enter lastName'
          />
      
            <Button className='btnSubmit'  type='submit' color="primary" onClick={changeName} >change</Button>




  return (
    <Container fluid className={styles.container}>
      <ToastContainer />
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
          isInValid,‚
          errors,
        }) => ( */}
      <Form noValidate className={styles.formContainer}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="passinp">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="password"
              value={pass}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Nhập pass
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" variant="primary" onClick={handle}>
          Đổi
        </Button>
      </Form>
      {/* )}
        </Formik> */}
    </Container>
    </form>
  </div>
  );
 
}

export default ResetPassword;
