import React from "react";
import {useState} from "react";
import styles from "./workout.module.css";

type Exercises = {
  id: number
  name: string;
  weight: number;
  unit:string
};


function ExerciseItem({id, name, weight,unit}: Exercises) {
  return (
    <>
      <p data-testid="list-item">{name+": "}{weight}</p>
    </>
  );
}

export default function Workout() {
  const [list,setList] = useState<Exercises[]>([]);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [currId, setId] = useState(0);
  const addToList=()=>{
    if(Number.isNaN(Number(weight)) || Number(weight) <= 0){
      // setList(list.concat({id: currId, name: name, weight: 0}));
      alert("Input valid number for weight");
    }
    else if(name=="") {
      alert("Input valid name for exercise");
    }
    else{
      setList(list.concat({id: currId, name: name, weight: Number(weight), unit:"lb"}));
      setId(currId+1);
      setName("");
      setWeight("");
    }
  };
  const remove=(id:number)=>{
    setList(list.filter((item) => item.id !== id));
  }
  const addWeight=(index:number)=>{
    const newList=[...list];
    newList[index].weight+=5;
    setList(newList);
  };
  const subWeight=(index:number)=>{
    var w = list[index].weight;
    if(w<=5){
      alert("Input weight greater than 0!");
    }
    else{
      const newList=[...list];
      newList[index].weight-=5;
      setList(newList);
    }
  };
  const toggleUnit=(index:number)=>{
    const newList=[...list];
    var u = list[index].unit
    if(u=='lb'){
      newList[index].unit='kg';
    }
    else{
      newList[index].unit='lb';
    }
    setList(newList);
  }
  return (
    <>
    <div className={styles.AppHeader}>
      <h1>Workout Tracker</h1>
      Workout Name
      <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        Weight
        <input 
          type="number" 
          value={weight}
          onChange={(n) => setWeight(n.target.value)}
        />
      <button onClick={addToList}>Add Workout</button>
      <div>
      {list.map((item,index) => (
        <div className={styles.Row}>
          <button style={{
            color:"rgb(67, 136, 95)",
            paddingRight: '5px'
          }} onClick={()=>addWeight(index)}>+</button>
          <button style={{
            color:"blue",
            paddingLeft: '15px',
            paddingRight: '25px'
          }} onClick={()=>subWeight(index)}>-</button>
          {ExerciseItem(item)}
          <button style={{
            color:"red",
            paddingLeft:'7px'
          }}
          onClick={()=>toggleUnit(index)}>{item.unit}</button>
          <button onClick={()=>remove(item.id)}>x</button>
        </div>
      ))}
    </div>
       
    </div>  
    </>
  );
}