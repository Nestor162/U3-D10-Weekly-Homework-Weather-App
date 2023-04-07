import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CityPage = () => {
  const lat = useSelector(state => state.search.coordinates[0]);
  const lon = useSelector(state => state.search.coordinates[1]);
  console.log(lat);
  const params = useParams();

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0ec525b97319fc8a90fcad3f3ee5991&units=metric`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchWeather, []);

  return (
    <Col xs={6} className="mx-auto mt-5">
      <h1>{params.city}</h1>
    </Col>
  );
};
export default CityPage;
