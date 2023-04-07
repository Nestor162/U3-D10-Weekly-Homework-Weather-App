import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const WeatherCard = () => {
  const lat = useSelector(state => state.search.coordinates[0]);
  const lon = useSelector(state => state.search.coordinates[1]);

  const info = useSelector(state => state.info);

  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(true);

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
    <Col xs={6} className="mx-auto mt-5">
      <h1>{params.city}</h1>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <div className="display-1 fw-bold">{info.main.temp}°</div>
          <div className="fs-2 fw-bold">{info.weather[0].description}</div>
          <Row className="mt-5 ">
            <Col xs={4} className=" text-center rounded">
              <div className="info-box p-4">
                <h5>Wind</h5>
                <div>{info.wind.speed}km / h</div>
              </div>
            </Col>
            <Col xs={4} className="text-center rounded ">
              <div className="info-box p-4">
                <h5>Humidity</h5>
                <div>{info.main.humidity}%</div>
              </div>
            </Col>
            <Col xs={4} className=" text-center rounded ">
              <div className="info-box p-4">
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
