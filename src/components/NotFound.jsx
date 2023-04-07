import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="errorContainer">
      <Alert variant="danger" className="text-center m-5">
        <h1>404 - PAGE NOT FOUND! ⚠️</h1>
        <h4 className="mt-2">
          Return to <Link to="/">HOME</Link>
        </h4>
      </Alert>
    </Container>
  );
};
export default NotFound;
