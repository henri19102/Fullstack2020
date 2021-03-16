import React from "react";
import { connect } from "react-redux";
import { voteAnec } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = props.anecdote;
  const filterAll = props.filter;

  const vote = (id) => {
    const editObj = anecdotes.find((x) => x.id === id);
    editObj.votes++;
    props.voteAnec(id, editObj);

    props.newNotification(`you voted "${editObj.content}"`, 5);
  };

  return (
    <div>
      {anecdotes
        .filter((x) => x.content.toLowerCase().includes(filterAll))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};
const mapDispatchToProps = {
  voteAnec,
  newNotification,
};

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter,
  };
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
