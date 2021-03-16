import React from "react";
import { Icon } from "semantic-ui-react";
import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const divStyle = {
    border: "solid ",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <div style={divStyle}>
          <h3>
            {entry.date} <Icon size="big" name="user md" />
          </h3>
          <p style={{ fontSize: "medium" }}>
            <i>{entry.description}</i>
          </p>
          {entry.healthCheckRating === 0 ? (
            <Icon size="big" color="green" name="heart" />
          ) : entry.healthCheckRating === 1 ? (
            <Icon size="big" color="yellow" name="heart" />
          ) : (
            <Icon size="big" color="red" name="heart" />
          )}
        </div>
      );
    case "Hospital":
      return (
        <div style={divStyle}>
          <h3>
            {entry.date} <Icon size="big" name="hospital" />
          </h3>
          <p style={{ fontSize: "medium" }}>
            <i>{entry.description}</i>
          </p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={divStyle}>
          <h3>
            {entry.date} <Icon size="big" name="stethoscope" />
          </h3>
          <p style={{ fontSize: "medium" }}>
            <i>{entry.description}</i>
          </p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
