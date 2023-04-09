/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeftCircle,
  FiCheckCircle,
  FiDroplet,
  FiMapPin,
  FiPlusCircle,
  FiThermometer,
  FiWind
} from "react-icons/fi";

import _01d from "../img/weather-icons/01d.png";
import _01n from "../img/weather-icons/01n.png";
import _02d from "../img/weather-icons/02d.png";
import _02n from "../img/weather-icons/02n.png";
import _03d from "../img/weather-icons/03d.png";
import _10d from "../img/weather-icons/10d.png";
import _11d from "../img/weather-icons/11d.png";
import _11n from "../img/weather-icons/11n.png";
import _13d from "../img/weather-icons/13d.png";
import _50d from "../img/weather-icons/50d.png";
import _default from "../img/weather-icons/default.png";

const WeatherCard = () => {
  const lat = useSelector(state => state.search.coordinates[0]);
  const lon = useSelector(state => state.search.coordinates[1]);

  const info = useSelector(state => state.info);

  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const [img, setImg] = useState();

  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);
  const checkSaved = useSelector(state => state.favorites);

  const [selected, setSelected] = useState();

  /* Qui ho usato il metodo some, che verifica se la citta attuale si trova già nei preferiti e in tale caso cambia a true lo stato saved per mostrare l'icona corrispondente */
  useEffect(() => {
    const isFavorite = checkSaved.some(city => city.id === info.id);
    setSaved(isFavorite);
  }, [checkSaved, info]);

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0ec525b97319fc8a90fcad3f3ee5991&units=metric`
    )
      .then(response => response.json())
      .then(data => {
        dispatch({ type: "GET_INFO", payload: data });
        setSelected(data);
        console.log("HAI SELEZIONATO " + data.name);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Creo un switch per andare a definire le immagine custom in ogni caso possibile
  useEffect(() => {
    if (!loading) {
      switch (info.weather[0].icon) {
        case "01d":
          setImg(_01d);
          break;
        case "01n":
          setImg(_01n);
          break;
        case "02d":
          setImg(_02d);
          break;
        case "02n":
          setImg(_02n);
          break;
        case "03d":
          setImg(_03d);
          break;
        case "03n":
          setImg(_03d);
          break;
        case "04d":
          setImg(_03d);
          break;
        case "04n":
          setImg(_03d);
          break;
        case "09d":
          setImg(_10d);
          break;
        case "09n":
          setImg(_10d);
          break;
        case "10d":
          setImg(_10d);
          break;
        case "10n":
          setImg(_10d);
          break;
        case "11d":
          setImg(_11d);
          break;
        case "11n":
          setImg(_11n);
          break;
        case "13d":
          setImg(_13d);
          break;
        case "13n":
          setImg(_13d);
          break;
        case "50d":
          setImg(_50d);
          break;
        case "50n":
          setImg(_50d);
          break;
        default:
          setImg(_default);
      }
    }
  }, [loading, info.weather]);

  return (
    <Col xs={9} md={7} className="mx-auto mt-4">
      <Row className=" align-items-center mb-5">
        <Col>
          <FiArrowLeftCircle
            className="fs-1 navIcons"
            onClick={() => {
              navigate("/");
            }}
          />
        </Col>
        <Col>
          <h1 className="text-nowrap ms-xm-1 ms-lg-5 ps-xl-1 ps-xxl-2">
            <span>
              <FiMapPin className="fs-2" />{" "}
            </span>
            {params.city}
          </h1>
        </Col>
        <Col className="text-end">
          {/* Per  evitare di passare un oggetto vuoto se l'utente fa click sul pulsante prima che la fetch sia finita,mentre carica mostro il pulsante senza l'onclick. Una volta caricato gestisco anche il 'toggle' del pulsante per salvare la citta */}
          {loading ? (
            <FiPlusCircle className="fs-1 navIcons" style={{ opacity: "0.5" }} />
          ) : saved ? (
            <FiCheckCircle
              className="fs-1 navIcons"
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_FAVORITES", payload: selected.id });
                console.log("HAI ELIMINATO " + selected.name);
                setSaved(false);
              }}
            />
          ) : (
            <FiPlusCircle
              className="fs-1 navIcons"
              onClick={() => {
                dispatch({ type: "ADD-LOCATION", payload: selected });
                console.log("HAI AGGIUNTO ", selected.name);
                setSaved(true);
              }}
            />
          )}
        </Col>
      </Row>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner style={{ width: "2.5rem", height: "2.5rem" }} />
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-center">
            <img src={img} alt="weather-icon" width={"210px"} style={{ marginBlock: "-10px" }} />
          </div>
          <div className="display-1 fw-bold text-center ps-4">{info.main.temp}°</div>
          <div className="fs-2 fw-bold text-center">{info.weather[0].description}</div>
          <Row className="mt-5 mb-5">
            <Col xs={12} sm={4} className=" text-center rounded">
              <div className="info-box p-4">
                <FiWind className="fs-2 mb-3" />
                <h5>Wind</h5>
                <div>{info.wind.speed} km/h</div>
              </div>
            </Col>
            <Col xs={12} sm={4} className="text-center rounded ">
              <div className="info-box p-4">
                <FiDroplet className="fs-2 mb-3" />
                <h5>Humidity</h5>
                <div>{info.main.humidity}%</div>
              </div>
            </Col>
            <Col xs={12} sm={4} className=" text-center rounded ">
              <div className="info-box p-4">
                <FiThermometer className="fs-2 mb-3" />
                <h5>Windchill</h5>
                <div>{info.main.feels_like}°</div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Col>
  );
};

export default WeatherCard;
