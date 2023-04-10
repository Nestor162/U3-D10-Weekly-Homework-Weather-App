import { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Forecast = () => {
  const lat = useSelector(state => state.search.coordinates[0]);
  const lon = useSelector(state => state.search.coordinates[1]);
  const info = useSelector(state => state.info);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [forecast, setForecast] = useState([]);

  const fetchWeatherDays = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c0ec525b97319fc8a90fcad3f3ee5991&units=metric`
    )
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
        setForecast(data.list);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(error);
      });
  };

  // Funzione per convertire la proprietà dt in oggetto date. ( dt viene molteplicando per 1.000 per ottenere i millisecondi)
  const convertToDate = dt => new Date(dt * 1000);

  useEffect(() => {
    fetchWeatherDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {error && (
        <Alert variant="danger" className="position-absolute top-0 end-0 start-0">
          ⚠️ Error: {error.message}
        </Alert>
      )}
      {!loading && (
        <Container id="loadedContent">
          <h4 className="mx-auto col-md-7 col-9 my-4 align-items-center mb-1">Today:</h4>

          <Row className="mx-auto col-md-7 col-9 align-items-center mb-5 mt-2">
            {forecast
              .filter(
                el =>
                  convertToDate(el.dt).toLocaleString("en-US", { weekday: "short" }) ===
                  convertToDate(info.dt).toLocaleString("en-US", { weekday: "short" })
              )
              .map((el, index) => (
                <Col key={index} id="today">
                  <div className="text-center my-3 border border-3 p-3 rounded">
                    <div className="small">{convertToDate(el.dt).getHours().toLocaleString()}:00</div>
                    <div className="fs-5 fw-semibold">{el.weather[0].main}</div>
                    <div className="text-muted fst-italic">{el.weather[0].description}</div>
                    <span>{el.main.temp_min}° / </span>
                    <span>{el.main.temp_max}°</span>
                  </div>
                </Col>
              ))}
          </Row>

          {forecast
            .filter(
              el =>
                convertToDate(el.dt).toLocaleString("en-US", { weekday: "short" }) !==
                convertToDate(info.dt).toLocaleString("en-US", { weekday: "short" })
            )
            .map((el, index) => (
              <>
                <Row className="mx-auto col-md-7 col-9 my-4 align-items-center">
                  {index % 8 === 0 && index !== 0 && <hr className="my-5 border border-dark border-2" />}
                  <Col>
                    <div className="text-muted">
                      {convertToDate(el.dt).toLocaleString("en-US", { weekday: "short" })}
                    </div>
                    <div className="small">{convertToDate(el.dt).getHours().toLocaleString()}:00</div>
                  </Col>
                  <Col className="ms-3">
                    <div className="fs-5 fw-semibold">{el.weather[0].main}</div>
                    <div className="text-muted fst-italic">{el.weather[0].description}</div>
                  </Col>
                  <Col className="text-end">
                    <span>{el.main.temp_min}° / </span>
                    <span>{el.main.temp_max}°</span>
                  </Col>
                </Row>
              </>
            ))}
        </Container>
      )}
    </>
  );
};

export default Forecast;
