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

  const getCardColor = weatherId => {
    switch (weatherId) {
      case "01d":
        return "day-sun";
      case "01n":
      case "02n":
      case "03n":
      case "04n":
        return "night";
      case "02d":
        return "clouds";
      case "03d":
      case "04d":
        return "clouds";
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return "rain";
      case "11d":
      case "11n":
        return "rain";
      case "13d":
      case "13n":
        return "clouds";
      case "50d":
      case "50n":
        return "snow";
      default:
        return "snow";
    }
  };

  return (
    <Col xs={9} md={7} className="mx-auto mt-5">
      {userFavorites.length > 0 ? (
        <>
          {userFavorites.map((el, i) => {
            const cardColor = getCardColor(el.weather[0].icon);
            return (
              <Card className={`favoriteCards mb-4 ${cardColor}`} key={i} text="light">
                <Card.Header className="fs-3 d-flex justify-content-between align-items-center">
                  <Link className="text-light" onClick={() => handleClick(el.name)}>
                    <span className="cityNameCard">{el.name}</span>{" "}
                    <span className="text-light fs-4">({el.sys.country})</span>
                  </Link>
                  <FiMinusCircle
                    className="navIcons removeIcon"
                    onClick={() => {
                      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: el.id });
                    }}
                  />
                </Card.Header>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title className="fs-4">
                    <div className="fs-3">{el.weather[0].main}</div>
                    <div className="mt-2 fs-5">
                      {el.main.temp_min}° / {el.main.temp_max}°
                    </div>
                  </Card.Title>
                  <Card.Text>
                    <span className="fw-bold display-4">{el.main.temp}°</span>
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
