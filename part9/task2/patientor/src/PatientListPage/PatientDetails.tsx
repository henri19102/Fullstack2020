import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import EntryDetails from "./EntryDetails";
import NewEntry from "./NewEntry";
import { Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

const PatientDetails: React.FC = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p) => p.id === id);
  const [entries, setEntries] = React.useState<Entry[] | undefined>([]);

  const fetchEntryList = async () => {
    try {
      const { data: patientListFromApi } = await axios.get<Entry[]>(
        `${apiBaseUrl}/patients/${id}/entries`
      );
      setEntries(patientListFromApi);
    } catch (e) {
      console.error(e);
    }
  };
  fetchEntryList();

  return (
    <div className="App">
      <Container>
        <div key={patient?.id}>
          <h2>
            {patient?.name}
            {patient?.gender === "male" ? (
              <Icon size="big" name="mars" />
            ) : patient?.gender === "female" ? (
              <Icon size="big" name="venus" />
            ) : (
              <Icon size="big" name="genderless" />
            )}
          </h2>

          <h3>ssn: {patient?.ssn}</h3>
          <h3>occupation: {patient?.occupation}</h3>

          <h2>entries</h2>

          {entries ? (
            entries.map((x, i) => <EntryDetails key={i} entry={x} />)
          ) : (
            <div></div>
          )}
        </div>
        <NewEntry />
      </Container>
    </div>
  );
};

export default PatientDetails;
