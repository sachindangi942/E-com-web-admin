import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Drawer, Modal, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../../Redux/Fetures/Authslice";
import { clearCart } from "../../Redux/Fetures/CartSlice";
import { showloading, hideloading } from "../../Redux/AlertSclice";
import { jwtDecode } from "jwt-decode"
import "./headerStyle.css";
import { persistor } from "../../Redux/Store";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import AddProduct from "../Products/AddProduct";

function HeaderNav() {
  const username = useSelector(state => state.auth.username);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerPlacement, setDrawerPlacement] = useState("right")
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkExp = useCallback(() => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      dispatch(clearToken());
      navigate("/singIn");
    } else {
      const remainingTime = (decodedToken.exp - currentTime) * 1000;
      setTimeout(() => {
        dispatch(clearToken());
        navigate("/singIn");
      }, remainingTime);
    }
  }, [dispatch, navigate, token]);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      checkExp();
    } else {
      setIsAuthenticated(false);
    }
  }, [token, checkExp]);

  const handleLogout = () => {
    dispatch(showloading());
    navigate("/singIn")
    dispatch(clearToken());
    dispatch(clearCart());
    persistor.purge();
    setIsAuthenticated(false);
    dispatch(hideloading());

  };

  const showDrawer = (placement = "right") => {
    setDrawerPlacement(placement);
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  }

  const handleOk = () => {
    handleLogout();
    setIsModalVisible(false);
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  }
  return (
    <Navbar expand="lg" className="mb-4 shadow-sm p-3 bg-light">
      <Container fluid>

        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          MyShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
          <Nav className="me-auto align-items-start">
            <Nav.Link as={Link} to="/" className="text-dark fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link onClick={() => showDrawer("left")} value="addProduct" className="text-dark fw-semibold">
              Add Products
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto ">
            {!isAuthenticated ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/singIn"
                  className="text-primary fw-bold"
                >
                  Login <LoginOutlined/>
                </Nav.Link>
              </>
            ) : (
              <>
                <div
                  onClick={() => showDrawer("right")}
                  className="ms-3 text-primary  fw-bold cursor-pointer"
                >
                  <UserOutlined style={{ fontSize: '31px', color: "black" }} />
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Drawer
        title={drawerPlacement === "right" ? username : "Add Products"}
        placement={drawerPlacement}
        onClose={closeDrawer}
        open={isDrawerVisible}
        className="fw-bold"
        width={drawerPlacement === "left" ? 600 : 300}
      >
        {drawerPlacement === "right" ?
          <>
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/settings"
                className="text-primary"
                onClick={closeDrawer}
              >
                Settings
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/help"
                className="text-primary"
                onClick={closeDrawer}
              >
                Help
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/changePassword"
                className="text-primary"
                onClick={closeDrawer}
              >
                Change Password
              </Nav.Link>
            </Nav>
            <Tooltip
              title="Logout From Here"
            >
              <Nav.Link as="button"
                className="text-danger"
                onClick={() => { showModal(); closeDrawer(); }}
              >
                Logout <LogoutOutlined />
              </Nav.Link>
            </Tooltip>

          </>

          : <AddProduct />}

      </Drawer>
      <Modal
        title="Are you sure you want to Logout ? "
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Click Yes to confirm Logout.</p>
      </Modal>
    </Navbar>
  );
}

export default HeaderNav;

