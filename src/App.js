import React from "react";
import "./styles.css";
import ProgressBar from "./components/ProgressBar";

export default function App() {
  const progressValue = [10, 20, 30, 40, 80];
  return (
    <div className="App">
      <div className="header">
        <h1>Progress Bar</h1>
        {progressValue.map((p) => (
          <ProgressBar progress={p} />
        ))}
      </div>
    </div>
  );
}
