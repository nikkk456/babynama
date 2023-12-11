import React, { useState, useEffect } from 'react';

const Home = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    const startCountdown = () => {
      setIsRunning(true);
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setIsRunning(false);
        } else {
          setSeconds((prevSeconds) => {
            if (prevSeconds === 0) {
              setMinutes((prevMinutes) => prevMinutes - 1);
              return 59;
            } else {
              return prevSeconds - 1;
            }
          });
        }
      }, 1000);
    };

    if (isRunning) {
      startCountdown();
    }

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds, isRunning]);

  const resetCountdown = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
  };

  const handleMinutesChange = (event) => {
    const newMinutes = parseInt(event.target.value, 10) || 0;
    setMinutes(newMinutes);
    setSeconds(0);
    setIsRunning(false);
  };

  const pauseCountdown = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <div>
        <label>Minutes:</label>
        <input
          type="number"
          value={minutes}
          onChange={handleMinutesChange}
          disabled={isRunning}
        />
      </div>
      <div>
        <p>{`${minutes}m : ${seconds}s`}</p>
      </div>
      <div>
        <button onClick={() => setIsRunning(true)} disabled={isRunning}>
          Play
        </button>
        <button onClick={resetCountdown}>Reset</button>
        {isRunning && <button onClick={pauseCountdown}>Pause</button>}
      </div>
    </div>
  );
};

export default Home;
