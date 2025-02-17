import React, { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";

const Counter = () => {
  const savedCount = localStorage.getItem("count");
  const initialCount = savedCount ? parseInt(savedCount, 10) : 0;

  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const colorProgress = count * 100;
    const gradient = `linear-gradient(135deg, rgba(0, ${
      255 - colorProgress
    }, ${colorProgress}, 0.7), rgba(0, 0, ${255 - colorProgress}, 0.7))`;

    document.body.style.transition =
      "background 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    document.body.style.background = gradient;

    localStorage.setItem("count", count);
  }, [count]);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Counter: {count}
      </Typography>
      <div>
        <Button
          variant="contained"
          onClick={increment}
          style={{ margin: "10px" }}
        >
          Increment
        </Button>
        <Button
          variant="contained"
          onClick={decrement}
          style={{ margin: "10px" }}
        >
          Decrement
        </Button>
        <Button variant="contained" onClick={reset} style={{ margin: "10px" }}>
          Reset
        </Button>
      </div>
    </Container>
  );
};

export default Counter;
