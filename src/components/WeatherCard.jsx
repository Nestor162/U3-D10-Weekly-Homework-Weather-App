import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeftCircle, FiDroplet, FiMapPin, FiPlusCircle, FiThermometer, FiWind } from "react-icons/fi";

const WeatherCard = () => {
  const lat = useSelector(state => state.search.coordinates[0]);
  const lon = useSelector(state => state.search.coordinates[1]);

  const info = useSelector(state => state.info);

  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0ec525b97319fc8a90fcad3f3ee5991&units=metric`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        dispatch({ type: "GET_INFO", payload: data });
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
          <h1 className="text-nowrap">
            <span>
              <FiMapPin className="fs-2" />{" "}
            </span>
            {params.city}
          </h1>
        </Col>
        <Col className="text-end">
          {/* Per  evitare di passare un oggetto vuoto se l'utente fa click sul pulsante prima che la fetch sia finita, prevedo la seguente condizione*/}
          {loading ? (
            <FiPlusCircle className="fs-1 navIcons" style={{ opacity: "0.5" }} />
          ) : (
            <FiPlusCircle className="fs-1 navIcons" onClick={() => dispatch({ type: "ADD-LOCATION", payload: info })} />
          )}
        </Col>
      </Row>

      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <div className="display-1 fw-bold text-center ps-5">{info.main.temp}°</div>
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
                <div>{info.main.feels_like}</div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Col>
  );
};

export default WeatherCard;
