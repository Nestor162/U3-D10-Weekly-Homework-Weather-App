import { Alert, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const FavoriteList = () => {
  const userFavorites = useSelector(state => state.favorites);
  console.log(userFavorites);

  return (
    <Col xs={9} md={7} className="mx-auto mt-5">
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

export default FavoriteList;
