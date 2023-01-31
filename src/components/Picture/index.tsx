import React from "react";
import {useState} from "react";
import styles from "./picture.module.css";
import { ErrorBoundary } from "react-error-boundary";


export default function Picture() {
  const [count, changeCount]=useState(1);
  const [numpics, setPics]=useState("1");
  const [seed, changeSeed]=useState("");
  const [seeds,setSeeds]=useState<string[]>([]);
  const generate=()=>{
    if(numpics=="" || Number(numpics)<=0) {
      alert("Number must be greater than 0");
      return;
    }
    if(Number(numpics)>5) {
      alert("Number must be less than or equal to 5");
      return;
    }
    var n = Number(numpics);
    let temp:Array<string>=[];
    setSeeds(temp);
    for(let x = 0; x < n; x++) {
      temp=temp.concat("https://picsum.photos/200/300?random="+(count+x));
    }
    changeCount(count+n);
    setSeeds(temp);

  }
  const ErrorMessage = ({}) => {
    return (
      <div>
        <h1>Picture not found</h1>
      </div>
    );
  };
  return (
    <>
    <ErrorBoundary
          FallbackComponent={ErrorMessage}
        >
    <div className={styles.AppHeader}>
      <div style={{
      display:'flex',
      flexDirection: 'column',
      alignItems:'center'
      }}>
        <h1>Picture Generator</h1>
        <p>Enter a number between 1 and 5  </p>
    <input 
          type="number" 
          value={numpics}
          onChange={(n) => setPics(n.target.value)}
        />
        </div>
        <div>
       {seeds.map((item)=>
        <img src={item} alt="Picture not found" />
       )}
       </div>
    {/* {seed.length > 0 ? (
            <img src={seed} alt="Picture not found" />
          ) : (
            <>
      </>
          )}       */}
          <button onClick={generate}>Generate</button>
          
      </div>
      </ErrorBoundary>
    </>
  );
}
