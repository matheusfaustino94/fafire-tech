import { Container } from "react-bootstrap";
import Topbar from "../Navbar";

const Layout = ({ children, routes }) => (
  <>
    <Topbar routes={routes} />
    <Container className="mt-4">{children}</Container>
  </>
);

export default Layout;
