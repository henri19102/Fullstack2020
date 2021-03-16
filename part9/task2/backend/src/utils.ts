import {
  Patient,
  Gender,
  Entry,
  HealthCheckRating,
  DiagnoseEntry,
} from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error("Incorrect or missing string: " + param);
  }
  return param;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!isRating(rating)) {
    throw new Error("Incorrect or missing rating");
  }
  return rating;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender" + gender);
  }
  return gender;
};

const arrayCheck = (obj: any): Array<DiagnoseEntry["code"]> => {
  if (!Array.isArray(obj)) {
    throw new Error("Incorrect or not an array");
  }
  return obj;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const entryTypeCheck = (obj: Entry): Object => {
  switch (obj.type) {
    case "Hospital":
      return {
        description: parseString(obj.description),
        date: parseString(obj.date),
        specialist: parseString(obj.specialist),
        diagnosisCodes: arrayCheck(obj.diagnosisCodes),
        type: obj.type,
        discharge: {
          date: parseString(obj.discharge.date),
          criteria: parseString(obj.discharge.criteria),
        },
      };
    case "HealthCheck":
      return {
        description: parseString(obj.description),
        date: parseString(obj.date),
        specialist: parseString(obj.specialist),
        diagnosisCodes: arrayCheck(obj.diagnosisCodes),
        type: obj.type,
        healthCheckRating: parseRating(obj.healthCheckRating),
      };
    case "OccupationalHealthcare":
      return {
        description: parseString(obj.description),
        date: parseString(obj.date),
        specialist: parseString(obj.specialist),
        diagnosisCodes: arrayCheck(obj.diagnosisCodes),
        type: obj.type,
        employerName: parseString(obj.employerName),
        sickLeave: {
          startDate: parseString(obj.sickLeave?.startDate),
          endDate: parseString(obj.sickLeave?.endDate),
        },
      };
    default:
      return assertNever(obj);
  }
};

const patientTypeCheck = (obj: any): Omit<Patient, "id"> => {
  return {
    name: parseString(obj.name),
    ssn: parseString(obj.ssn),
    dateOfBirth: parseString(obj.dateOfBirth),
    occupation: parseString(obj.occupation),
    gender: parseGender(obj.gender),
    entries: obj.entries,
  };
};

export default patientTypeCheck;
