import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientList } from "../state";
import { Button, Form } from "semantic-ui-react";

const NewEntry: React.FC = () => {
  const [, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [open, setOpen] = React.useState("");
  const [newType, setNewType] = React.useState("HealthCheck");
  const [disDate, setDisDate] = React.useState("");
  const [criteria, setCriteria] = React.useState("");

  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [employerName, setEmployerName] = React.useState("");

  const [specialist, setSpecialist] = React.useState("");
  const [newDate, setNewDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [diagnoseCode, setDiagnoseCode] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

 

  const sendErrorMsg = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  const submitNewEntry = async (e: any) => {
    e.preventDefault();
    let newEntry2 = {
      description: description,
      date: newDate,
      specialist: specialist,
      diagnosisCodes: [diagnoseCode],
      type: newType,
    };
    let newEntry;
    if (newType === "Hospital") {
      newEntry = {
        ...newEntry2,
        discharge: { date: disDate, criteria: criteria },
      };
    }
    if (newType === "HealthCheck") {
      newEntry = { ...newEntry2, healthCheckRating: rating };
    }
    if (newType === "OccupationalHealthcare") {
      newEntry = {
        ...newEntry2,
        employerName: employerName,
        sickLeave: { startDate: startDate, endDate: endDate },
      };
    }

    try {
      await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, newEntry);

      const { data: patientListFromApi } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients`
      );
      dispatch(setPatientList(patientListFromApi));
      setOpen("");
      setNewType("HealthCheck");
    } catch (e) {
      console.error(e);
      sendErrorMsg("invalid fields");
    }
  };

  const closeForm = () => {
    setOpen("")
    setNewType("HealthCheck");
  }

  if (open === "") {
    return (
      <div>
        <Button style={{ margin: "1%" }} onClick={() => setOpen("open")}>Add new entry</Button>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={closeForm}>close form</Button>
      <Form onSubmit={submitNewEntry}>
        {errorMsg === "" ? (
          <div></div>
        ) : (
          <p style={{ color: "red" }}>{errorMsg}</p>
        )}

        <label>
          Type:
          <select onChange={({ target }) => setNewType(target.value)}>
            <option value={"HealthCheck"}>HealthCheck</option>
            <option value={"Hospital"}>Hospital</option>
            <option value={"OccupationalHealthcare"}>
              OccupationalHealthcare
            </option>
          </select>
        </label>

        <label>
          Specialist:
          <input
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          ></input>
        </label>

        <label>
          Date:
          <input
            value={newDate}
            onChange={({ target }) => setNewDate(target.value)}
          ></input>
        </label>

        <label>
          Description:
          <input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></input>
        </label>

        <label>
          Diagnosis code:
          <input
            value={diagnoseCode}
            onChange={({ target }) => setDiagnoseCode(target.value)}
          ></input>
        </label>

        {newType === "Hospital" ? (
          <div>
            <label>
              Discharge (set date and criteria):
              <input
                value={disDate}
                onChange={({ target }) => setDisDate(target.value)}
              ></input>
              <input
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
              ></input>
            </label>
          </div>
        ) : newType === "HealthCheck" ? (
          <label>
            Health check rating:
            <input
              value={rating}
              onChange={({ target }) => setRating(Number(target.value))}
              type="number"
              min="0"
              max="3"
            ></input>
          </label>
        ) : (
          <div>
            <label>
              Employer name:
              <input
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              ></input>
            </label>
            <label>
              Sick leave (set start date and end date):
              <input
                value={startDate}
                onChange={({ target }) => setStartDate(target.value)}
              ></input>
              <input
                value={endDate}
                onChange={({ target }) => setEndDate(target.value)}
              ></input>
            </label>
          </div>
        )}

        <Button style={{ margin: "1%" }} type="submit">
          submit
        </Button>
      </Form>
    </div>
  );
};

export default NewEntry;
