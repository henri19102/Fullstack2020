import React from "react";
import { connect } from "react-redux";
import { filt } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    let sana = event.target.value.toLowerCase();
    props.filt(sana);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filt,
};

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter,
  };
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ConnectedFilter;
