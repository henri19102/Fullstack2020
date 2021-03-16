import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({ weight: Number(weight), height: Number(height), bmi: bmi });
});

app.post("/exercises", (req, res) => { 
  const objectSize = Object.keys(req.body).length; // eslint-disable-next-line 
  const daily = req.body.daily_exercises; // eslint-disable-next-line
  const target = req.body.target; 
  if (isNaN(target) || !Array.isArray(daily) || daily.length === 0) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  if (objectSize !== 2) {
    return res.status(400).json({ error: "wrong amount of parameters" });
  }
  return res.json(calculateExercises(target, daily));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
