const initialState = {
  search: {
    coordinates: [],
    city: ""
  },
  info: {},
  favorites: [],
  inputFocus: false,
  clicked: false
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

    case "GET_INFO":
      return {
        ...state,
        info: action.payload
      };

    case "ADD-LOCATION":
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter(value => value.id !== action.payload)
      };

    case "INPUT_FOCUS":
      return {
        ...state,
        inputFocus: action.payload
      };

    case "START_BUTTON_CLICKED":
      return {
        ...state,
        clicked: action.payload
      };
    default:
      return state;
  }
};

export default coordinatesReducer;
