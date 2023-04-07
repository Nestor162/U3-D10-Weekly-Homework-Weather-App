import { Col, Form } from "react-bootstrap";
import "../App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [geocoding, setGeocoding] = useState([]);

  const fetchCordinates = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=c0ec525b97319fc8a90fcad3f3ee5991`)
      .then(response => response.json())
      .then(data => {
        setGeocoding(data);
      });
  };

  useEffect(() => {
    if (geocoding.length > 0) {
      dispatch({ type: "GET_COORDINATES", payload: [geocoding[0].lat, geocoding[0].lon] });
      navigate(`/city/${city}`);
    }
  }, [geocoding, dispatch, navigate, city]);

  return (
    <Col xs={9} md={7} className="mx-auto mt-5">
      <h1 className="fw-bold">Weather</h1>
      <Form
        className="mb-3"
        type="search"
        value={city}
        onSubmit={e => {
          e.preventDefault();
          console.log(city);
          dispatch({ type: "GET_CITY", payload: city });
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
