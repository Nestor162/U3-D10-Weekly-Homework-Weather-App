import { Alert, Card, Col } from "react-bootstrap";
import { FiMinusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FavoriteList = () => {
  const userFavorites = useSelector(state => state.favorites);
  console.log(userFavorites);

  const dispatch = useDispatch();

  return (
    <Col xs={9} md={7} className="mx-auto mt-5">
      {userFavorites.length > 0 ? (
        <>
          {userFavorites.map((el, i) => {
            return (
              <Card bg={"light"} key={i} text={"dark"} className="mb-4">
                <Card.Header className="fs-3 d-flex justify-content-between align-items-center">
                  <Link className="text-dark" to={`/city/${el.name}`}>
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

export default FavoriteList;
