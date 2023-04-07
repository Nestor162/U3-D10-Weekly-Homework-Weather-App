import { Col, Form } from "react-bootstrap";
import "../App.css";
import { useState } from "react";
// import { useDispatch } from "react-redux";

const SearchInput = () => {
  // const dispatch = useDispatch();

  const [city, setCity] = useState("");

  const fetchCordinates = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=c0ec525b97319fc8a90fcad3f3ee5991`)
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <Col xs={6} className="mx-auto mt-5">
      <h1 className="fw-bold">Weather</h1>
      <Form
        className="mb-3"
        type="search"
        value={city}
        onSubmit={e => {
          e.preventDefault();
          fetchCordinates();
        }}
      >
        <Form.Control
          placeholder="Enter your city name..."
          aria-label="city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
      </Form>
    </Col>
  );
};
export default SearchInput;
