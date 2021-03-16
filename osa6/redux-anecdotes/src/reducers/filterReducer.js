export const filt = (sana) => {
  return {
    type: "FILT",
    sana,
  };
};

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILT":
      return action.sana;
    default:
      return state;
  }
};

export default filterReducer;
