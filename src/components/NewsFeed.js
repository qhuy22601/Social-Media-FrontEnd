import AppsIcon from "@mui/icons-material/Apps";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import "./styles/Header.css";

function NewsFeed() {
  const styles = {
    circleImageLayout: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
    },
    container: {
      width: 600,
      color: "white",
      height: "100vh",
    },
    h: {
      textTransform: "capitalize",
    },
    bn: {
      color: "#0d6efd",
    },
    name: {
      color: "black",
      textTransform: "capitalize",
    },
    cancle: {
      marginRight: 70,
    },
  };

  const [name, setName] = useState(localStorage.getItem("UserName"));
  const [initialList, setInitialList] = useState([]);
  const [items, setItems] = useState([]);
  const [userName, setUserName] = useState(
    localStorage.getItem("UserFirstName") +
      " " +
      localStorage.getItem("UserLastName")
  );
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState("");
  const uploader = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem("UserAvata", reader.result);
    });
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    setUrl(localStorage.getItem("UserAvata"));
  }, []);
  let navigate = useNavigate();

  function handleClick(e) {
    navigate("/newsfeed/allaccounts");
  }

  function handleSignOut(e) {
    localStorage.removeItem("UserId");
    localStorage.removeItem("Token");
    localStorage.removeItem("UserFirstName");
    localStorage.removeItem("UserLastName");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("UserAvata");
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/unauthorized");
    }
  });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleChange = ({ target }) => {
    setSearch(target.value);
    if (!target.value) {
      setItems(initialList);
      return;
    }
    const lowerSeach = target.value.toLowerCase();
    const filter = items.filter(({ name }) =>
      name.common.toLowerCase().includes(lowerSeach)
    );
    setItems(filter);
  };

  async function load() {
    fetch("api/auth/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setInitialList(result);
        },
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
  }

  function cancel() {
    setSearch("");
  }

  function searchh() {}

  return (
    <div className="main">
      <Container>
        <div className="header">
          <SearchInput />

          <div className="header_center">
            <div className="header_option header_option--active">
              <Link to="">
                {" "}
                <HomeOutlinedIcon fontSize="large" />
              </Link>
            </div>
            <div className="header_option">
              <Link to="following">
                {" "}
                <SupervisedUserCircleOutlinedIcon fontSize="large" />
              </Link>
            </div>
            <div className="header_option">
              <Link to="follower">
                <PeopleAltOutlinedIcon fontSize="large" />
              </Link>
            </div>
            <div
              className="header_option"
              onClick={handleClick}
              color="primary"
            >
              <ExploreOutlinedIcon style={styles.bn} fontSize="large" />
            </div>
            <div className="header_option">
              <Link to="game">
                <WidgetsOutlinedIcon fontSize="large" />
              </Link>
            </div>
          </div>

          <div className="header_right">
            <div className="header_info">
              <Link to="myprofile">
                {" "}
                <img src={url} style={styles.circleImageLayout} />
              </Link>

              <h4 className="name" style={styles.name}>
                {name}{" "}
              </h4>
            </div>

            <div className="iconButton">
              <IconButton>
                <Link to="editform">
                  <AppsIcon />
                </Link>
              </IconButton>
            </div>
            <div className="iconButton">
              <IconButton>
                <Link to="chat">
                  <ForumIcon />
                </Link>
              </IconButton>
            </div>

            <div className="iconButton" onClick={handleSignOut}>
              <IconButton>
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <Container className="pt-3" style={styles.container}>
          <Col md={13}>
            <Outlet />{" "}
          </Col>
        </Container>
      </Container>
    </div>
  );
}

export default NewsFeed;
