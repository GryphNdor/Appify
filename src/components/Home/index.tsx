import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Welcome to Appify</h1>
        <p>
          There are plenty of basic applications that we use in everyday life.
          The Goal of Appify is to makes mini-apps that help take care of those
          tasks.
        </p>
        <div className="container">
          <Link to="counter">
            <button>Counter</button>
          </Link>
          <Link to="picture">
            <button>Picture Generator</button>
          </Link>
          <Link to="workout">
            <button>Workout Tracker</button>
          </Link>
        </div>
      </header>
    </div>
  );
}
