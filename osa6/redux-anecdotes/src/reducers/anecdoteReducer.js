import anecdoteService from "../services/anecdotes";

export const voteAnec = (id, editObj) => {
  return async (dispatch) => {
    await anecdoteService.addVote(id, editObj);
    dispatch({ type: "VOTE" });
  };
};

export const createAnec = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.createNew(content);
    console.log(newAnec);
    dispatch({
      type: "NEW_ANEC",
      data: newAnec,
    });
  };
};

export const allAnecdotes = () => {
  return async (dispatch) => {
    const anecs = await anecdoteService.getAll();
    console.log(anecs);
    dispatch({
      type: "GET_ALL",
      data: anecs,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return [...state];
    case "NEW_ANEC":
      return [...state, action.data];
    case "GET_ALL":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
