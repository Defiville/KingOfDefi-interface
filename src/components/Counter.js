import moment from "moment";
import React, { useEffect, useState } from "react";

function Counter() {
  const [Minute, setMinute] = useState(0);
  const [Second, setSecond] = useState(0);
  const [Hour, setHour] = useState(0);
  const [day, setDay] = useState(0);
  const [Time, setTime] = useState();
  const [show, setShow] = useState(false);

  const getUnixFormat = (date) => {
    return moment.utc(date).unix();
  };

  const getCurrentWeekDays = () => {
    let counterTime;
    const weekStart = moment.utc().startOf("week");
    const currentWed = moment(weekStart).add(3, "days");
    const nextWed = moment(currentWed).add(6, "days");
    const unixCurrentWed = getUnixFormat(currentWed);
    const unixNextWed = getUnixFormat(nextWed);
    const currentTime = getUnixFormat();
    if (currentTime <= unixCurrentWed) {
      counterTime = unixCurrentWed - currentTime;
    } else {
      counterTime = unixNextWed - currentTime;
    }
    setTime(counterTime);
  };

  const checkThursday = () => {
    const currentDate = moment.utc().format("YYYY-MM-DD");
    const weekStart = moment.utc().startOf("week");
    const currentWed = moment(weekStart).add(4, "days").format("YYYY-MM-DD");
    if (currentDate === currentWed) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    checkThursday();
    getCurrentWeekDays();
  }, []);

  useEffect(() => {
    const timeUp = () => {
      getCurrentWeekDays();
    };

    const interval = setInterval(function () {
      if (Time > 0) {
        setSecond(Time % 60);
        setMinute(Math.floor((Time / 60) % 60));
        setHour(Math.floor((Time % 86400) / 60 / 60));
        setDay(Math.floor(Time / 86400));
        setTime((Time) => Time - 1);
      } else if (Time === 0) {
        setSecond(0);
        setMinute(0);
        setHour(0);
        setTime(0);
        setDay(0);
      }
    }, 1000);
    if (Time === 0) {
      timeUp();
    }
    return () => clearInterval(interval);
  }, [Time]);
  return show ? (
    <div className="timer">
      <span>
        {day} {day > 1 ? "days" : "day"}
      </span>
      <span>{Hour} hrs</span>
      <span>{Minute} min</span>
      <span>{Second} Sec</span>
    </div>
  ) : (
    false
  );
}

export default Counter;
