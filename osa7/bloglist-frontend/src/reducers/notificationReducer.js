let newObj = {msg:'',suc:''}

export const newNotification = (message, success) => {
  return (dispatch) => {
    dispatch({ type: "MESSAGE", message, success });
    setTimeout(() => {
      dispatch({ type: "BACK" });
    }, 5000);
  };
};

const notificationReducer = (state = newObj, action) => {
  switch (action.type) {
    case "BACK":
      return newObj;
    case "MESSAGE":
        let newObj2 = {msg: action.message, suc: action.success}
      return newObj2;
    default:
      return state;
  }
};

export default notificationReducer;
