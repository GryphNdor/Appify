import React from "react";

type Exercises = {
  name: string;
  weight: number;
};

function ExerciseItem(props: any) {
  return (
    <>
      <div data-testid="list-item"></div>
    </>
  );
}

export default function Workout() {
  return (
    <>
      <h1>Workout Page</h1>
    </>
  );
}
