import { Alert, Card, Col, Container } from "react-bootstrap";
import { FiMinusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import WelcomeMessage from "./WelcomeMessage";
import { useEffect, useState } from "react";

const FavoriteList = () => {
  const userFavorites = useSelector(state => state.favorites);
  const [geocoding, setGeocoding] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCordinates = city => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=c0ec525b97319fc8a90fcad3f3ee5991`)
      .then(response => response.json())
      .then(data => {
        setGeocoding(data);
      });
  };
  const handleClick = city => {
    setSelectedCity(city);

    fetchCordinates(city);
  };

  useEffect(() => {
    if (geocoding) {
      console.log("selected:" + selectedCity);
      dispatch({ type: "GET_COORDINATES", payload: [geocoding[0].lat, geocoding[0].lon] });
      navigate(`/city/${selectedCity}`);
      console.log("cambiamento abilitato");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geocoding]);

  return (
    <Col xs={9} md={7} className="mx-auto mt-5">
      {userFavorites.length > 0 ? (
        <>
          {userFavorites.map((el, i) => {
            return (
              <Card bg={"light"} key={i} text={"dark"} className="mb-4">
                <Card.Header className="fs-3 d-flex justify-content-between align-items-center">
                  <Link className="text-dark" onClick={() => handleClick(el.name)}>
                    <span className="cityNameCard">{el.name}</span>{" "}
                    <span className="text-secondary fs-4">({el.sys.country})</span>
                  </Link>
                  <FiMinusCircle
                    className="navIcons removeIcon"
                    onClick={() => {
                      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: el.id });
                    }}
                  />
                </Card.Header>
                <Card.Body>
                  <Card.Title className="fs-4"> {el.weather[0].main}</Card.Title>
                  <Card.Text>
                    <div className="fw-bold fs-2">{el.main.temp}°</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </>
      ) : (
        <>
          <Container>
            <WelcomeMessage />
          </Container>
          <Container>
            <Alert variant="warning" className="mt-5">
              <p className="fs-4"> Saved locations will appear here</p>
              <p className="fs-5">
                <em> Search for a City and click the "+" sign to add a location</em>
              </p>
            </Alert>
          </Container>
        </>
      )}
    </Col>
  );
};

export default FavoriteList;
