let timeOut;

export const newNotification = (anec, sec) => {
  clearTimeout(timeOut);

  return (dispatch) => {
    dispatch({ type: "NOTIFICATION", anec });

    timeOut = setTimeout(() => {
      dispatch({ type: "BACK" });
    }, sec * 1000);
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "BACK":
      return "";
    case "NOTIFICATION":
      return action.anec;
    default:
      return state;
  }
};

export default notificationReducer;
