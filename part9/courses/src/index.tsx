import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CourseDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseDescription {
  name: "WOW";
  random: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;




const Part: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  return ( 
<div>

    {courseParts.map(part => {
      switch (part.name) {
        case "Fundamentals":
          return <p key={part.name} >{part.name}, {part.exerciseCount}, {part.description}</p> 
       
        case "Using props to pass data":
          return <p key={part.name} >{part.name}, {part.exerciseCount}, {part.groupProjectCount}</p>
        
        case "Deeper type usage":
         return <p key={part.name} >{part.name}, {part.exerciseCount}, {part.description}, {part.exerciseSubmissionLink}</p> 
          
         case "WOW":
          return <p key={part.name} >{part.name}, {part.exerciseCount}, {part.description}, {part.random}</p> 
        default:
          return assertNever(part) ;
      }
  
    })} 
      
      </div>

  )
  
};

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return <div>{courseName}</div>;
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      <Part courseParts={courseParts} />
      </div>
     
    
  );
};

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const sumExercises = courseParts.reduce((a, x) => a + x.exerciseCount, 0);

  return (
    <div>
      <p>Total amount of exercises: {sumExercises}</p>
    </div>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
    {
      name: "WOW",
      exerciseCount: 44,
      description: "nice",
      random: "yup"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
