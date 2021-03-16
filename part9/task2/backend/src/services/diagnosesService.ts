import diagnosesData from "../../data/diagnoses.json";
import { DiagnoseEntry } from "../types";

const diagnoses: Array<DiagnoseEntry> = diagnosesData;

const getDiagnoses = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
};
