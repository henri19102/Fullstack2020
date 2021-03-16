import patients from "../../data/patients";
import { Patient, PublicPatient, Entry } from "../types";
import { v4 as newID } from "uuid";

const getPatients = (): Patient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, ssn, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      ssn,
      entries,
    })
  );
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (obj: any, id2: string): Entry => {
  const newEntry = { id: newID(), ...obj };
  const patient = patients.find((x) => x.id === id2);
  patient?.entries.push(newEntry);
  return newEntry;
};

const addPatient = (
  name: string,
  ssn: string,
  dateOfBirth: string,
  occupation: string,
  gender: string
): Patient => {
  const newPatient = {
    id: newID(),
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  addEntry,
};
