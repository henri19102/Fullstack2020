import React from "react";
import { connect } from "react-redux";
import { createAnec } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addAnec = async (e) => {
    e.preventDefault();
    const content = e.target.anec.value;
    e.target.anec.value = "";

    props.createAnec(content);
    props.newNotification(`new anecdote "${content}"`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnec,
  newNotification,
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
