interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface MultiplyValues {
  value1: number;
  value2: Array<number>;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const value1 = args[2];
  const value2 = args.filter((_a, i) => i > 2);

  if (
    Number(value1) &&
    value2.map((a) => Number(a)).filter((x) => isNaN(x)).length === 0
  ) {
    return {
      value1: Number(value1),
      value2: value2.map((a) => Number(a)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (target: number, args: Array<number>): Result => {
  const periodLength = args.length;
  const trainingDays = args.filter((a) => a > 0).length;
  const average = args.reduce((a, b) => a + b, 0) / args.length;
  const success = average >= target;
  const rating = average < 1 ? 1 : average > 2 ? 3 : 2;
  const ratingDescription =
    rating === 1
      ? "You should do more exercises!"
      : rating === 2
      ? "Not too bad but could be better"
      : "Good job!";
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message); // eslint-disable-line
}
