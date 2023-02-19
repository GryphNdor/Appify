import React from "react";
import { useState } from "react";
import styles from "./picture.module.css";
import { ErrorBoundary } from "react-error-boundary";

export default function Picture() {
  const [count, changeCount] = useState(1);
  const [numpics, setPics] = useState("1");
  const [seeds, setSeeds] = useState<JSX.Element[]>([]);

  const generate = () => {
    if (numpics === "" || Number(numpics) <= 0) {
      alert("The number put by the user must be greater than 0");
      return;
    }
    if (Number(numpics) > 5) {
      alert("The number must be less than or equal to 5");
      return;
    }
    const numPics = Number(numpics);
    const elements = Array.from({ length: numPics }, (_, i) => (
      <img key={count + i} src={`https://picsum.photos/200/300?random=${count + i}`} alt="Picture is not found" />
    ));
    setSeeds(elements);
    changeCount(count + numPics);
  };

  const ErrorMessage = () => {
    return (
      <div>
        <h1>Picture is not found</h1>
      </div>
    );
  };

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <div className={styles.AppHeader}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>Picture Generator</h1>
            <p>Input a number between 1 and 5 </p>
            <input type="number" value={numpics} onChange={(n) => setPics(n.target.value)} />
          </div>
          <div>
            {seeds}
          </div>
          <button onClick={generate}>Generate</button>
        </div>
      </ErrorBoundary>
    </>
  );
}
