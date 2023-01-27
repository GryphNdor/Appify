import React, {useState} from 'react';
import './style_work.css';

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

export default function Workout(prop: any) {
  //used to keep track of workout weights
  const [weights, changeWeight] = useState([]);
  const [weight, setWeight] = useState(0);

  //used to keep track of workout names
  const [workouts, setWorkout] = useState([]);
  const [name, setName] = useState('');

  // used to keep track of individual units of each item
  const [unit, changeUnit] = useState('lb');
  const [unitArr, setUnit] = useState([]);

  //used to determine if the input is empty
  const [isEmpty, changeStatus] = useState(true);

  //Decrement weight by 5lbs
  let decrease = (index) => {
    if (weights[index] >= 5){
      let updatedWeight = [...weights];
      updatedWeight[index] = updatedWeight[index] - 5;
      changeWeight(updatedWeight);
    }
  }
  //Increment weight by 5lbs
  let increase = (index) => {
    let updatedWeight = [...weights];
      updatedWeight[index] = updatedWeight[index] + 5;
      changeWeight(updatedWeight);
  }


  //Handle converintg units from lbs to kg or vice versa. 
  let convert = (index) =>{
    if (unitArr[index] === 'kg'){
      let updatedWeight = [...weights];
      let newUnit = [...unitArr];

      updatedWeight[index] = +(updatedWeight[index] * 2.2046);
      newUnit[index] = 'lb';

      setUnit(newUnit);
      changeWeight(updatedWeight);

    } else if (unitArr[index] === 'lb'){
  
      let updatedWeight = [...weights]; 
      let newUnit = [...unitArr];

      updatedWeight[index] =  (updatedWeight[index] / 2.2046);
      newUnit[index] = 'kg';

      setUnit(newUnit);
      changeWeight(updatedWeight);
    }

  }

  //Handle adding workout
  let handleAddWorkout =()=>{
    
    if (name !== '' && weight !== 0){
      setWorkout([...workouts, name]);
      changeWeight([...weights, weight]);
      setUnit([...unitArr, unit]);
    }
  }
  
  //remove/reset the item at the index so it removes only the clicked item
  let removeWorkouts = (index) => {
    workouts.splice(index,1);
    weights.splice(index,1);
    setWorkout([...workouts]);
    changeWeight([...weights]);
  }

  return (
    <>
      <h1>Workout Page</h1>  
      <h1 className='title'>Workout Tracker</h1>
      
      {workouts.map((names, index) => (
        <div key={index} className='items' data-testid="list-item"> 
          <button key={index} className='remove' onClick={() => removeWorkouts(index)}>x</button> 
          <button className='unit' onClick={() => convert(index)}>Change unit</button>
          <div className='texts'>{names} {Math.round(weights[index])} {unitArr[index]}</div>
          <button className='increase' onClick={() => increase(index)}>+</button>
          <button className='decrease' onClick={() => decrease(index)}>-</button>
        </div>
      ))}

      <input className='workoutWeight' placeholder='Enter weight in lb' type="number" onChange={weight => setWeight(+weight.target.value)}></input>
      <input className='workoutName' placeholder='Enter name of workout'type='form' onChange={e => setName(e.target.value)}></input>
      <button disabled= {!isEmpty} className='add' onClick={handleAddWorkout}> Add Workout</button>
    </>
  );
}
