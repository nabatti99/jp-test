import * as actionTypes from "./actionTypes";

const initialState = {
  screenName: "Home",
  level: null,
  section: null,
  unit: null,
  test: null,
  timestamp: new Date(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_SCREEN:
      return {
        ...state,
        screenName: action.screenName,
        level: null,
        section: null,
        unit: null,
        test: null,
      };

    case actionTypes.CHANGE_TEST:
      return {
        ...state,
        level: action.level,
        section: action.section,
        unit: action.unit,
        test: action.test,
      };

    case actionTypes.UPLOAD_NEW_TEST:
      return {
        ...state,
        timestamp: new Date(),
      };

    default:
      return state;
  }
}
