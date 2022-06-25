import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { Formik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import "./styles/FileBtn.css";
import styles from "./styles/SignIn.module.css";

function SignUp() {
  const [file, setFile] = useState(null);
  const [file64String, setFile64String] = useState(null);
  const [file64StringWithType, setFile64StringWithType] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [resData, setResData] = useState(null);

  let navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    avata: yup.string(),
  });

  async function postSignUpInfo(inputData) {
    const response = await axios({
      method: "post",
      url: "/api/auth/users/save",
      data: {
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        username: inputData.username,
        email: inputData.email,
        password: inputData.password,
        avata: file64StringWithType,
        role: userRole,
      },
    });

    if (response.data !== null) {
      setResData(response.data);
    }

    if (response.data !== null && response.data.status === "that bai") {
      showWarningToast(response.data.message);
    }

    if (response.data !== null && response.data.status === "thanh cong") {
      navigate("/");
    }
  }
  function onUploadFileChange(e) {
    setFile64String(null);
    if (e.target.files < 1 || !e.target.validity.valid) {
      return;
    }

    compressImageFile(e);
  }

  function fileToBase64(file, cb) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  }

  function fileToBase64(file, cb) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  }

  async function compressImageFile(event) {
    const imageFile = event.target.files[0];

    const options = {
      maxWidthOrHeight: 250,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // input file is compressed in compressedFile, now write further logic here

      fileToBase64(compressedFile, (err, result) => {
        if (result) {
          setFile(result);
          //   console.log(file);
          //   console.log(String(result.split(",")[1]));
          setFile64StringWithType(result);
          setFile64String(String(result.split(",")[1]));
        }
      });
    } catch (error) {
      setFile64String(null);
      // console.log(error);
    }
  }

  function showWarningToast(inputMessage) {
    toast.warn(inputMessage, {
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

  return (
    <Container fluid className={styles.container}>
      <ToastContainer />
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
          username: "",
          firstName: "",
          lastName: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          postSignUpInfo(values);
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
              <Paper className={styles.paper_logo} elevation={10}>
                <Grid className={styles.grid_logo}>
                  <h2>Sign Up</h2>
                </Grid>
                <Row>
                  <Form.Group
                    className={styles.formGroup}
                    as={Col}
                    md="12"
                    controlId="signInFirstName"
                  >
                    <Form.Label className={styles.formLabel}>Họ</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={touched.firstName && errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      Nhập họ
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className={styles.formGroup}
                    as={Col}
                    md="12"
                    controlId="signInLastName"
                  >
                    <Form.Label className={styles.formLabel}>Tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={touched.lastName && errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      Nhập Tên
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className={styles.formGroup}
                    as={Col}
                    md="12"
                    controlId="signInUserName"
                  >
                    <Form.Label className={styles.formLabel}>UserName</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      isInvalid={touched.username && errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      Nhập userName
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className={styles.formGroup}
                    as={Col}
                    md="12"
                    controlId="signInEmail"
                  >
                    <Form.Label className={styles.formLabel}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      Nhập email
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    className={styles.formGroup}
                    as={Col}
                    md="12"
                    controlId="signInPassword"
                  >
                    <Form.Label className={styles.formLabel}>
                      Mật khẩu
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && errors.password}
                    />

                    <Form.Control.Feedback type="invalid">
                      Nhập mk
                    </Form.Control.Feedback>

                    <Form.Group>
                      <Form.Label className={styles.formFile}>
                        {" "}
                        Avata
                        <Form.Control
                          className="inside"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={onUploadFileChange}
                        />
                        <CloudUploadOutlinedIcon />
                      </Form.Label>
                    </Form.Group>
                  </Form.Group>
                </Row>
                <Button type="submit" variant="primary">
                  Đăng kí
                </Button>
              </Paper>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default SignUp;