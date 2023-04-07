const initialState = {
  search: {
    coordinates: [],
    city: ""
  }
};

const coordinatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COORDINATES":
      return {
        ...state,
        search: {
          ...state.search,
          coordinates: action.payload
        }
      };
    case "GET_CITY":
      return {
        ...state,
        search: {
          ...state.search,
          city: action.payload
        }
      };
    default:
      return state;
  }
};

export default coordinatesReducer;
