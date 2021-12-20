import React, { useEffect, useState } from "react";

export default function Timer({ handleTimeOut, startTime, classes = "" }) {
  const [time, setTime] = useState(startTime);
  useEffect(() => {
    const countTime = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) return prev - 1;
        handleTimeOut(true);
      });
    }, 1000);
    return () => {
      clearInterval(countTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = () => {
    const seconds = `${Math.floor(time % 60)}`;
    const minutes = `${Math.floor(time / 60)}`;
    return `${minutes.length === 1 ? "0" : ""}${minutes}:${
      seconds.length === 1 ? "0" : ""
    }${seconds}`;
  };

  return <div className={classes}>{formatTime()}</div>;
}
