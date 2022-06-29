import { Navbar, Container, Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Topbar = ({ location, routes = [] }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Professor Allocation</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {routes
              .filter((route) => route.visible ?? true)
              .map((route, index) => (
                <Link
                  className={`nav-link ${
                    location.pathname === route.path ? "active" : ""
                  }`}
                  to={route.path}
                  key={index}
                >
                  {route.name}
                </Link>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(Topbar);
