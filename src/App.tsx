import React from "react";
import Counter from "./components/Counter";
import Picture from "./components/Picture";
import Workout from "./components/Workout";
import Home from "./components/Home";
import Error from "./components/Error";

import { BrowserRouter, Route, Routes } from "react-router-dom";

/**
 * Routing logic for Appify
 *
 * Should not need to change
 *
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="picture" element={<Picture />} />
        <Route path="workout" element={<Workout />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
