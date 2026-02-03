/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
import { useEffect, useRef, useState } from 'react';

const GetCountTime = (props) => {
  const [timer, setTimer] = useState(0); // 25 minutes
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      tick.current = setInterval(() => {
        setTimer((timers) => timers + 1);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    setStart(!start);
  };
  const pad = (n) => (n < 10 ? `0${n}` : n);

  const dispSecondsAsMins = (seconds) => {
    // 25:00
    const hour = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60);
    const mins_ = hour % 60;
    const seconds_ = seconds % 60;
    const countData = `${hour === 0 ? `00` : hour}:${pad(
      mins > 60 ? mins_.toString() : mins.toString()
    )}:${seconds_ === 0 ? '00' : seconds_.toString()}`;
    localStorage.setItem('time_todo', JSON.stringify(countData));
    return countData;
  };
  //   props?.propsToParrent(start, setStart);

  return (
    <div className="pomView">
      <h5>{dispSecondsAsMins(timer)}</h5>
      <div className="startDiv">
        <button className="startBut" onClick={toggleStart}>
          {!start ? 'START' : 'STOP'}
        </button>
      </div>
    </div>
  );
};
export default GetCountTime;
