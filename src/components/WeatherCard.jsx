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

const WeatherCard = () => {
  const lat = useSelector(state => state.search.coordinates[0]);
  const lon = useSelector(state => state.search.coordinates[1]);

  const info = useSelector(state => state.info);

  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(true);

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

  return (
    <Col xs={9} md={7} className="mx-auto mt-5">
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
        <Spinner></Spinner>
      ) : (
        <div>
          <div className="display-1 fw-bold text-center ps-4">{info.main.temp}°</div>
          <div className="fs-2 fw-bold text-center">{info.weather[0].description}</div>
          <Row className="mt-5 ">
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
