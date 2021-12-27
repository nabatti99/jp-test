import * as actionTypes from "./actionTypes";

const initialState = {
  screenName: "Home",
  level: null,
  unit: null,
  test: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_SCREEN:
      return {
        ...state,
        screenName: action.screenName,
        level: null,
        unit: null,
        test: null,
      };

    case actionTypes.CHANGE_TEST:
      return {
        ...state,
        level: action.level,
        unit: action.unit,
        test: action.test,
      };

    default:
      return state;
  }
}
