import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

const useDebouncedState = <T>(initialValue:T, setState:(newValue:T)=>void, delay = 500):[T, (value:T)=>void] => {

  const [value, setValue] = useState<T>(initialValue);
  const debouncedValue = useRef(_.debounce((newValue) => setState(newValue), delay));

  useEffect(() => {
    debouncedValue.current(value);
    return () => debouncedValue.current.cancel();
  }, [value]);

  return [value, setValue];
};

export default useDebouncedState;
