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

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


function ResetPassword(){


  const[firstName, setFirstName] = useState('')
  const[lastName, setLastName] = useState('')


  let navigate = useNavigate();


  function handleChange(e){
    e.preventDefault();
    setFirstName( e.target.value);
    
  }
  function handle(e){
    e.preventDefault();
    setLastName( e.target.value);
  }


  const [resData, setResData] = useState(null);

  async function changeName(inputData){

      const res = await axios({
        method: "put",
        url: "/api/auth/users/changepass",
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

            </form>
  </div>
  );
}
export default ResetPassword;
