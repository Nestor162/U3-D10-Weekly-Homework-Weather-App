import { useSelector } from "react-redux";
import SearchInput from "./SearchInput";
import FavoriteList from "./FavoriteList";

const Home = () => {
  const userFavorites = useSelector(state => state.favorites);
  console.log(userFavorites);

  return (
    <>
      <SearchInput />;
      <FavoriteList />
    </>
  );
};

export default Home;
