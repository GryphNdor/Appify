import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <h1>404: Return to the Main Page</h1>
      <button>
        <Link to="/">Go Back</Link>
      </button>
    </div>
  );
}
