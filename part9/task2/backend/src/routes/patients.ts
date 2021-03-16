import express from "express";
import patientService from "../services/patientService";
import patientTypeCheck, { entryTypeCheck } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const id: string = req.params.id;
  const patient = patientService.getPatients().find((x) => x.id === id);
  res.send(patient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const id: string = req.params.id;
    const patient = patientService.getPatients().find((x) => x.id === id);
    const id2 = patient?.id;
    const newEntry = entryTypeCheck(req.body);
    const entry2 = patientService.addEntry(newEntry, `${id2}`);
    res.json(entry2);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/:id/entries", (req, res) => {
  try {
    const id: string = req.params.id;
    const patient = patientService.getPatients().find((x) => x.id === id);
    res.send(patient?.entries);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = patientTypeCheck(req.body);
    const newPatientEntry = patientService.addPatient(
      newPatient.name,
      newPatient.ssn,
      newPatient.dateOfBirth,
      newPatient.occupation,
      newPatient.gender
    );
    res.json(newPatientEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
