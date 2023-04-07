import { Alert, Col, Form } from "react-bootstrap";
import "../App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [geocoding, setGeocoding] = useState([]);

  const userFavorites = useSelector(state => state.favorites);
  console.log(userFavorites);

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
          // dispatch({ type: "GET_COORDINATES", payload: [geocoding[0].lat, geocoding[0].lon] });
        }}
      >
        <Form.Control
          placeholder="Enter your city name..."
          aria-label="city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
      </Form>
      {userFavorites.length > 0 ? (
        <>
          {userFavorites.map(el => {
            return <div>{el.name}</div>;
          })}
        </>
      ) : (
        <Alert variant="warning">
          <p className="fs-4"> Saved locations will appear here</p>
          <p className="fs-5">
            <em> Search for a City and click the "+" sign to add a location</em>
          </p>
        </Alert>
      )}
    </Col>
  );
};
export default SearchInput;
