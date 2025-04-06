import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import logoImage from "../../assets/images/logo-dark.svg";
import { BiHomeAlt2, BiPlusCircle, BiLogInCircle, BiPackage, BiMenu } from "react-icons/bi";
import Search from "../search/Search";
import useNavigation from "../../hooks/useNavigation";

const Navigation = () => {
  const { token, show, handleClose, handleShow, navigateTo, tokenRemovalHandler } = useNavigation();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary mb-3 shadow" sticky="top">
        <Container>
          <Navbar.Brand className="d-lg-none ms-2 me-auto" onClick={() => navigateTo("/")}>
            <Image src={logoImage} alt="eStore logo" width="85px" />
          </Navbar.Brand>

          <Offcanvas show={show} onHide={handleClose} responsive="lg" placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <Image src={logoImage} alt="eStore logo" width="80px" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Navbar.Brand className="d-none d-lg-block d-lg-flex align-items-center" onClick={() => navigateTo("/")}>
                <Image src={logoImage} alt="eStore logo" width="90px" />
              </Navbar.Brand>
              <Nav className="me-auto gap-2 w-auto">
                <Nav.Link onClick={() => navigateTo("/products")}>
                  <Stack direction="horizontal" gap="1">
                    <BiPackage />
                    Products
                  </Stack>
                </Nav.Link>
                {/* <NavDropdown title="Kategorije" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Kategorija 1
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Kategorija 2
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
                <Nav.Link onClick={() => navigateTo("/products/add")} hidden={!token}>
                  <Stack direction="horizontal" gap="1">
                    <BiPlusCircle />
                    Add Product
                  </Stack>
                </Nav.Link>
                <Nav.Link hidden={token} onClick={() => navigateTo("/login")}>
                  <Stack direction="horizontal" gap="1">
                    <BiLogInCircle />
                    Login
                  </Stack>
                </Nav.Link>
                <Nav.Link hidden={!token} onClick={tokenRemovalHandler}>
                  <Stack direction="horizontal" gap="1">
                    <BiLogInCircle />
                    Logout
                  </Stack>
                </Nav.Link>
              </Nav>
              {/* </Navbar.Collapse> */}
            </Offcanvas.Body>
          </Offcanvas>
          <Search className="w-50" />
        </Container>
      </Navbar>
      <div className="position-fixed bottom-0 w-100 bg-white border shadow z-3 d-sm-block d-lg-none">
        <Stack direction="horizontal">
          <Link to="/products" className="m-auto d-flex flex-column align-items-center py-2 text-decoration-none text-dark">
            <BiHomeAlt2 className="fs-5" />
            <div className="">eStore</div>
          </Link>
          <Link to="/products" className="m-auto d-flex flex-column align-items-center py-2 text-decoration-none text-dark">
            <BiPackage className="fs-5" />
            <div className="">Products</div>
          </Link>
          {token ? (
            <Link to="/products/add" className="m-auto d-flex flex-column align-items-center py-2 text-decoration-none text-dark">
              <BiPlusCircle className="fs-5" />
              <div className="">Add</div>
            </Link>
          ) : (
            <Link to="/login" className="m-auto d-flex flex-column align-items-center py-2 text-decoration-none text-dark">
              <BiLogInCircle className="fs-5" />
              <div className="">Login</div>
            </Link>
          )}
          <Link onClick={handleShow} className="m-auto d-flex flex-column align-items-center py-2 text-decoration-none text-dark">
            <BiMenu className="fs-4 text-dark" />
            Menu
          </Link>
        </Stack>
      </div>
    </>
  );
};

export default Navigation;
