import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {
  BsFillBookFill,
  BsGithub,
  BsFillShareFill,
  BsFillPersonPlusFill,
  BsFillCpuFill,
} from "react-icons/bs";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Token") !== null) {
      navigate("/newsfeed");
    }
  });

  return (
    <Container>
      <Link to="/signin">
        {" "}
        <Button variant="primary">Đăng nhập</Button>
      </Link>
      <Link to="/signup">
        <Button variant="primary">Đăng kí</Button>
      </Link>
      <Link to ="/chat">
        <Button variant="primary">ChatCord</Button>
      </Link>

    </Container>
  );
}

export default HomePage;
