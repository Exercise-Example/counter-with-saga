export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const INCREMENT_ASYNC = "INCREMENT_ASYNC";
export const READ_RIBBT = "READ_RIBBT";
export const READ_SUCCES = "READ_SUCCES";

export function onIncrement() {
  return {
    type: INCREMENT
  };
}

export function onDecrement() {
  return {
    type: DECREMENT
  };
}

export function incrementAsync() {
  return {
    type: INCREMENT_ASYNC
  };
}

export function readRibbt() {
  return {
    type: READ_RIBBT
  };
}

export function readSucces(data) {
  return {
    type: READ_SUCCES,
    payload:  data
  };
}