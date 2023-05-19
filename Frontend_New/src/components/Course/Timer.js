import { Text } from '@chakra-ui/react';
import React, { useState , useEffect , useRef } from 'react';
const Timer = props => {
  const {optionselect , onClose} = props;
  const STATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
  };

  const INITIAL_COUNT = 120;
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STARTED);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;
  useEffect(() => {

    if(status ===  'Stopped'){
      onClose();
    }
  } , [status])
  const handleStart = () => {
    setStatus(STATUS.STARTED);
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(INITIAL_COUNT);
  };
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );
  return (
    <>
      <Text>
        {' '}
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}{' '}
      </Text>
    </>
  );
};

export default Timer;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = num => String(num).padStart(2, '0');
