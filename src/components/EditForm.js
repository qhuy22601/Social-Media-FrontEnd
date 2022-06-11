import imageCompression from "browser-image-compression";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import updateProfile from "../feature/updateProfile/updateProfile";
import { Formik } from "formik";
import * as yup from "yup";
import styles from "./styles/SignIn.module.css";
import $ from 'jquery';

function EditForm() {
  const [file, setFile] = useState(null);
  const [file64String, setFile64String] = useState(null);
  const [file64StringWithType, setFile64StringWithType] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [resData, setResData] = useState(null);

  const { id } = useParams();

  let navigate = useNavigate();

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const user = { firstName, lastName };
  //   console.log(user);
  //   updateProfile
  //     .update(id, user)
  //     .then((response) => {
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // function onUploadFileChange(e) {
  //   setFile64String(null);
  //   if (e.target.files < 1 || !e.target.validity.valid) {
  //     return;
  //   }

  //   compressImageFile(e);
  // }

  // function fileToBase64(file, cb) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     cb(null, reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     cb(error, null);
  //   };
  // }

  // async function compressImageFile(event) {
  //   const imageFile = event.target.files[0];

  //   const options = {
  //     maxWidthOrHeight: 250,
  //     useWebWorker: true,
  //   };
  //   try {
  //     const compressedFile = await imageCompression(imageFile, options);
  //     // input file is compressed in compressedFile, now write further logic here

  //     fileToBase64(compressedFile, (err, result) => {
  //       if (result) {
  //         setFile(result);
  //         //   console.log(file);
  //         //   console.log(String(result.split(",")[1]));
  //         setFile64StringWithType(result);
  //         setFile64String(String(result.split(",")[1]));
  //       }
  //     });
  //   } catch (error) {
  //     setFile64String(null);
  //     // console.log(error);
  //   }
  // }

  // function showWarningToast(inputMessage) {
  //   toast.warn(inputMessage, {
  //     position: "bottom-center",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // }

  // const[firstName, setFirstName] = useState("");
  // const[lastName, setLastName] = useState("");
  // function showFailMessage(inputMessage) {
  //   toast.error(inputMessage, {
  //     position: "bottom-center",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // }

 


  // function handleChange(e){
  //   e.preventDefault();
  //   setFirstName( e.target.value);
    
  // }
  // function handle(e){
  //   e.preventDefault();
  //   setLastName( e.target.value);
  // }

  //     }catch(e){
  //       showFailMessage("Loioix!");
  //     }
  //   }
  // const [pass, setPass] = useState("");

  // async function changePass(inpPass) {
  //   try {
  //     const res = await axios({
  //       method: "put",
  //       url: "/api/auth/users/update",
  //       header: {
  //         Authorization: localStorage.getItem("Token"),
  //       },
  //       data: {
  //         pass: inpPass,
  //       },
  //     });
  //     if (res.data.status === "thanh cong" && res.data !== null) {
  //       showFailMessage("Thành công!");
  //       navigate("/newfeed");
  //     }

  //     if (res.data !== null && res.data.status === "that bai") {
  //       console.log("Lỗi rồi!");
  //     }

  //   } catch (e) {
  //     showFailMessage("lỗi rồi");
  //   }
    

  // }
  let fName = $('#firstName').val();
  let lName = $('#lastName').val();

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  });

  async function changeName(inputData){

    const res = await axios({
      method: "put",
      url: "/api/auth/users/change/" + localStorage.getItem("UserId"),
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
      data:{
        firstName : inputData.firstName,
        lastName: inputData.lastName,
      },
    });
    if (res.data !== null && res.data.status === "that bai") {
      showWarningToast(res.data.message);
    }

    if (res.data !== null && res.data.status === "thanh cong") {
      setResData(res.data);
      localStorage.removeItem("UserId");
      localStorage.removeItem("Token");
      localStorage.removeItem("UserFirstName");
      localStorage.removeItem("UserLastName");
      localStorage.removeItem("UserEmail");
      localStorage.removeItem("UserAvata");
      navigate("/");
    }

  }
  function showWarningToast(inputMessage) {
    toast.warn("Invalid input", {
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
          firstName: "",
          lastName: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          changeName(values);
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
           
                <Form.Group
                  className={styles.formGroup}
                  as={Col}
                  md="12"
                  controlId="changeFirstName"
                >
                  <Form.Label className={styles.formLabel}>Họ</Form.Label>
                  <Form.Control
                    className="text_field"
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isInvalid={touched.firstName && errors.firstName}
                    placeholder="Họ"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Nhập Họ
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className={styles.formGroup}
                  as={Col}
                  md="12"
                  controlId="changeLastName"
                >
                  <Form.Label className={styles.formLabel}>lastName</Form.Label>
                  <Form.Control
                    className="text_field"
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isInvalid={touched.lastName && errors.lastName}
                    placeholder="Tên"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Nhập Tên
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  className={styles.btnSubmit}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Đổi
                </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default EditForm;
