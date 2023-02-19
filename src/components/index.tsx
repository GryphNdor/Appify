import {useState} from "react";
import styles from "./counter.module.css";
import { Link } from "react-router-dom";


/**
 * Counter App
 *
 */

export default function Counter() {
  const [count, increment] = useState(0);
  const colors=["Purple","Pink","Blue","black"];
  const [color, setColor]=useState("Blue");

  function buttonClick(){
    increment(count+1);
    if(count%10===9){
      setColor(colors[((count+1)/10)%4]);
    }
  };
  return (
    <>
      <div className = {styles.AppHeader} style={{
          color:color
      }}>
      <h1 style={{
      textAlign:'center'
    }}>Counter Page</h1>
      <p style={{
        fontSize: '140%',
        position: 'relative',
        color: color,
      }}>
      {count}
        </p>
        <button className = "button" role="button" style={{
          color:color
        }} onClick={buttonClick}>Counter</button> 
        </div>

    </>
  );
}