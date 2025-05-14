import React, { useState } from "react";
import "../styles.css";
import { useEffect } from "react";

const ProgressBar = ({ progress }) => {
  const [delayedProgress, setDelayedProgress] = useState(0);

  useEffect(() => {
    setTimeout(setDelayedProgress(progress), 3000);
  }, []);

  return (
    <div>
      <div className="outer">
        <div
          className="inner"
          style={{
            transform: `translateX(${delayedProgress - 100}%)`,
          }}
        >
          {delayedProgress}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
