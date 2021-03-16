export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight * 10000) / (height * height);
  if (bmi <= 25 && bmi >= 18.5) {
    return "Normal (healthy weight)";
  }
  if (bmi < 18.5) {
    return "Underweight";
  }
  return "Overweight";
};

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

console.log(calculateBmi(a, b));
