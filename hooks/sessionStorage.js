import { useState } from 'react';

const useSessionStorage = (key, initialValue) => {
  // Supports JSON objects and strings

  // State to store our value
  // Passing initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // JSON.parse will fail for non-JSON strings
      console.log(error);
      return initialValue;
    }
  });

  // Store new value to localStorage.
  const setValue = value => {
    try {
      // Value could be a function as well as string
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

// We want named export instead of default here
// eslint-disable-next-line import/prefer-default-export
export { useSessionStorage };
