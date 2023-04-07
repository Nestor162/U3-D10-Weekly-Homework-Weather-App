import { Col, Form } from "react-bootstrap";

const SearchInput = () => {
  return (
    <Col xs={6} className="mx-auto mt-5">
      <h1>Weather</h1>
      <Form className="mb-3">
        <Form.Control placeholder="Enter your city name..." aria-label="city" />
      </Form>
    </Col>
  );
};
export default SearchInput;
