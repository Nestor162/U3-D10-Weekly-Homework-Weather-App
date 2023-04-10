import { Alert, Col, Form, Row, Spinner } from "react-bootstrap";
import "../App.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import icon from "../img/weather_app_logo.png";
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [geocoding, setGeocoding] = useState([]);
  const [loading, setLoading] = useState(false);

  const focus = useSelector(state => state.inputFocus);

  // Uso lo hook useRef per 'selezionare' l'imput e successivamente dargli il focus
  const inputRef = useRef();

  const [error, setError] = useState(false);
  const fetchCordinates = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=c0ec525b97319fc8a90fcad3f3ee5991`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          switch (response.status) {
            case 400:
              throw new Error("Bad Request: The request could not be understood or was missing required parameters.");
            case 401:
              throw new Error("Unauthorized: The API key provided is not valid or has expired.");
            case 403:
              throw new Error("Forbidden: The server understood the request, but is refusing to fulfill it.");
            case 404:
              throw new Error("Not Found: The requested resource could not be found on the server.");
            case 429:
              throw new Error("Too Many Requests: The user has sent too many requests in a given amount of time.");
            case 500:
              throw new Error(
                "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
              );
            default:
              throw new Error("Something went wrong with the fetch call");
          }
        }
      })
      .then(data => {
        setGeocoding(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(error);
      });
  };

  useEffect(() => {
    if (geocoding.length > 0) {
      dispatch({ type: "GET_COORDINATES", payload: [geocoding[0].lat, geocoding[0].lon] });
      navigate(`/city/${city}`);
    }
  }, [geocoding, dispatch, navigate, city]);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [focus, inputRef]);

  return (
    <Col xs={9} md={7} className="mx-auto mt-5">
      <Row>
        <Col xs={9}>
          <h1 className="fw-bold d-inline-block align-middle">Minimal Weather App</h1>
          <h5 className="ms-1">
            <em>By Nestor Cicardini</em>
          </h5>
        </Col>
        <Col xs={3} className="d-flex justify-content-end align-items-center">
          <img src={icon} alt="app icon" className="d-inline-block" style={{ width: "70px" }} />
        </Col>
      </Row>
      {error && (
        <Alert variant="danger" className="position-absolute top-0 end-0 start-0">
          ⚠️ Error: {error.message}
        </Alert>
      )}
      {loading && (
        <Spinner
          className="position-absolute"
          style={{ width: "10rem", height: "10rem", top: "50%", left: "45%", zIndex: "10" }}
        />
      )}
      <Form
        className="mb-3 mt-4 position-relative"
        type="search"
        value={city}
        onSubmit={e => {
          e.preventDefault();
          setLoading(true);
          dispatch({ type: "GET_CITY", payload: city });
          fetchCordinates();
        }}
      >
        <Form.Control
          placeholder="Type your city name and press enter"
          aria-label="city"
          value={city}
          onChange={e => setCity(e.target.value)}
          ref={inputRef}
          onBlur={() => dispatch({ type: "INPUT_FOCUS", payload: false })}
          className="d-inline-block ps-5 py-2"
        />
        <FiSearch className="fs-5" style={{ position: "absolute", left: "17px", bottom: "11px" }} />
      </Form>
    </Col>
  );
};
export default SearchInput;
