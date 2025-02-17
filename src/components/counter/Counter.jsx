import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import "./counter.css";

const Counter = () => {
  const savedCount = localStorage.getItem("count");
  const initialCount = savedCount ? parseInt(savedCount, 10) : 0;

  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const colorProgress = count * 100;
    const gradient = `linear-gradient(135deg, rgba(0, ${
      255 - colorProgress
    }, ${colorProgress}, 0.7), rgba(0, 0, ${255 - colorProgress}, 0.7))`;

    document.body.style.background = gradient;
    localStorage.setItem("count", count);
  }, [count]);

  return (
    <Container className="counter-container">
      <Typography variant="h3" gutterBottom>
        Counter: {count}
      </Typography>
      <div>
        <button onClick={() => setCount(count + 1)} className="counter-button">
          Increment
        </button>
        <button onClick={() => setCount(count - 1)} className="counter-button">
          Decrement
        </button>
        <button onClick={() => setCount(0)} className="counter-button">
          Reset
        </button>
      </div>
    </Container>
  );
};

export default Counter;
