import React, { useState } from 'react';
import { useEffect } from 'react';

import styles from '../styles/clock.module.css';

const Clock = () => {
  
  const getTime = (mydate)=> {
    let hours = mydate.getHours();
    let minutes = mydate.getMinutes();
    let seconds = mydate.getSeconds();
    var ampm = "AM";

    if( hours >= 12 ) {
      hours = hours - 12;
      ampm = "PM";
    }
    if(hours === 0) {
      hours = 12;
    }
    if(hours < 10) {
      hours = `0${hours}`;
    }
    if(minutes < 10) {
      minutes = `0${minutes}`;
    }
    if(seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${hours} : ${minutes} : ${seconds} ${ampm}`
  }

  const [val, setVal] = useState(getTime(new Date()));
  // const [val, setVal] = useState(new Date().toLocaleTimeString());

  useEffect(()=> {
    setInterval(()=> {
      setVal(getTime(new Date()));
      // setVal(new Date().toLocaleTimeString());
    },1000);
  }, []);

  return (
    <div className={styles.clock}>
      <h1>{val}</h1>
    </div>
  )
}

export default Clock;