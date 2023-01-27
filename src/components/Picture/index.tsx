import React, {useState} from 'react';
import "./style_pic.css"


export default function Picture() { 
  const [num, changeNum] = useState(1);
  const [pics, setPics] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  var invalidNum = false;

  //Get the number of image user wants to generate 
  const getNumber = (value) => {

    changeNum(value.target.value);  
    
  }

  //Check if the number user inputted is a valid number. In this case, between 1 and 5
  if (+num == 0 || +num >5){
      invalidNum = true;
  }

  const generate = async() =>{
    if (isLoading){
      return;
    }
    setLoading(true);
    setPics([]);
    // Used try-catch block for error handling and added if statement to see if the response status was OK. 
    // Only add the url to the array if the response is OK
    try {
      //Loop user input value times and add Lorem Picsum random URL to an array
      for(var i = 0; i < +num; i++) {
        // To prevent the url from getting cached, added some parameter at the end to get new image every time.
        const response = await fetch(`https://picsum.photos/150/200?random&t=${new Date().getTime()}`);
        if (response.ok) {
          //if the response is OK, add to array
          setPics(prevPics => [...prevPics, response.url]);
        } else {
          // set error state to true, this will be used in the return statement to display error message
          setError(true);
        }
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
   
  }
  return (
    <>
      <h1>Picture Page</h1>  
        {error && <p>Picture Not Found.</p>}
        <input className='forms' type="form" placeholder="Enter the number of picture you want to see (1-5)"onChange={getNumber}/>
        <button className='button' disabled={invalidNum} onClick={generate}>Generate</button>
        <div className='container_pic'>
          {pics.map((image, i) => <img className='pic' key={i} src={image}></img>)}
        </div>

    </>
  );
}

