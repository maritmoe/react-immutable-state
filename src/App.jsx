import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [showDoneOnly, setShowDoneOnly] = useState(false);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    console.log("addNewWorkout:", newWorkout);
    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout);
    setWorkouts(workouts.filter((w) => w !== workout));
  };

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout);
    const updatedWorkouts = workouts.map((w) =>
      w === workout ? { ...w, done: !w.done } : w
    );
    setWorkouts(updatedWorkouts);
  };

  const replaceWorkout = (workout) => {
    const newWorkout = generateWorkout();
    const updatedWorkouts = workouts.map((w) =>
      w === workout
        ? {
            ...w,
            exercise: newWorkout.exercise,
            reps: newWorkout.reps,
            rest: newWorkout.rest,
            sets: newWorkout.sets,
            done: newWorkout.done,
          }
        : w
    );
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label>
        <input type="checkbox" onClick={() => setShowDoneOnly(!showDoneOnly)} />
        Show Done Only
      </label>
      <ul>
        {workouts.map(
          (workout, index) =>
            // Makes list of done workouts if the "show done only" checkbox is checked, and list of all workouts if not
            (!showDoneOnly || workout.done) && (
              <li key={index}>
                <p>
                  {workout.sets}x sets of{" "}
                  <strong>
                    {workout.reps}x{workout.exercise}
                  </strong>{" "}
                  with {workout.rest} seconds rest
                </p>
                {!workout.done && (
                  <button onClick={() => completeWorkout(workout)}>Done</button>
                )}
                {workout.done && <p>✅</p>}
                <button onClick={() => deleteWorkout(workout)}>Delete</button>
                <button onClick={() => replaceWorkout(workout)}>Replace</button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default App;
