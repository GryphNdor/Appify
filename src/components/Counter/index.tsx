import React, {useState} from 'react';
import "./style_counter.css";
/**
 * Counter App
 *
 */
export default function Counter() {

  const [count, changeCount] = useState(0);

  //Default color of the button's text
  var colors = 'black';


  //Increase counter by 1
  let increase = () => {

    changeCount(count + 1);
  }
  // change the color of the text every 10 counts 
  if (count % 10 === 0 && count !==0 ){
      colors = 'red';
  }

  // Display the buttons, texts, and some styling
  return (
    <>
      <h1>Counter Page</h1>
      <div className='buttons'>

        <button onClick={increase} style={{color:colors}}>Increase Counter</button>

      </div>

      <h1 className="countText" style={{color:colors, fontFamily:"italics", fontSize:"100px"}}>{count}</h1>
    </>
  );
}

