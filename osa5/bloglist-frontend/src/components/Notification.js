import React from "react";

const Notification = ({ errorM, successM }) => {
  if (errorM === null && successM === null) {
    return null;
  }
  if (successM) {
    return <div className="success">{successM}</div>;
  }
  return <div className="error">{errorM}</div>;
};

export default Notification;
