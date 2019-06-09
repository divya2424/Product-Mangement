import {
  SET_PRODUCT_DATA,
  UNSET_PRODUCT_DATA,
  SET_SEARCH_LIST,
  UNSET_SEARCH_LIST,
  SET_DATA,
  UNSET_DATA
} from "../actions/constants";

const initialState = {
  productList: [],
  searchList: [],
  selected : {}
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DATA:
      return {
        ...state,
        productList: action.payload
      };
    case UNSET_PRODUCT_DATA:
      return {
        ...state,
        productList : []
      };
    case SET_SEARCH_LIST:
      return {
        ...state,
        searchList : action.payload
      };

    case UNSET_SEARCH_LIST:
      return {
        ...state,
        searchList : []
      };
      case SET_DATA:
      return {
        ...state,
        selected : action.payload
      };

    case UNSET_DATA:
      return {
        ...state,
        selected : {}
      };
    default:
      return state;
  }
};

export default productReducer;
