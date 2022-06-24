import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
 
import Button from "react-bootstrap/Button";

import "./styles/homepage.css"



function HomePage() {



  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Token") !== null) {
      navigate("/newsfeed");
    }
  });

  return (
    <Container classname = "container">
      <Link to="/signin">
        {" "}
        <Button variant="primary">Đăng nhập</Button>
      </Link>
      <Link to="/signup">
        <Button variant="primary">Đăng kí</Button>
      </Link>
      <Button variant="primary" href="http://localhost:3007/">Messenger</Button>
  
    </Container>
  );
}

export default HomePage;
