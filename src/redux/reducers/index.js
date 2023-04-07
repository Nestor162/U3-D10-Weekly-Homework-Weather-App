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
          coordinates: [...state.search.coordinates, action.payload]
        }
      };
    default:
      return state;
  }
};

export default coordinatesReducer;
