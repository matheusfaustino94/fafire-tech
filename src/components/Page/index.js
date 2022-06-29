import { Card } from "react-bootstrap";

const Page = ({ children, title }) => (
  <Card>
    <Card.Header>{title}</Card.Header>
    <Card.Body>{children}</Card.Body>
  </Card>
);

export default Page;
