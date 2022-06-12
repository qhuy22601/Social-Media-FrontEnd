import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";

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
    </Container>
  );
}

export default HomePage;
