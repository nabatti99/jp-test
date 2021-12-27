import * as actionTypes from "./actionTypes";

export function navigate(screenName) {
  return {
    type: actionTypes.CHANGE_SCREEN,
    screenName,
  };
}

export function changeTest(level, unit, test) {
  return {
    type: actionTypes.CHANGE_TEST,
    level,
    unit,
    test,
  };
}
