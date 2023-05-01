import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    // Set up state to track the value of the stored data
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get the value from Local Storage, or use the provided initial value if the key does not exist
          const item = window.localStorage.getItem(key);
          if (item) {
              return item ? JSON.parse(item) : initialValue;
              
          }
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
  
    // Set up a listener for changes in Local Storage
    useEffect(() => {
      const handleStorageChange = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          try {
            // Update the storedValue state with the new value from Local Storage
            const item = JSON.parse(event.newValue);
            setStoredValue(item);
          } catch (error) {
            console.error(error);
          }
        }
      };
  
      window.addEventListener('storage', handleStorageChange);
  
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, [key]);
  
    // Set up a function to update the value in Local Storage
    const setValue = (value) => {
      try {
        // Update the storedValue state
        setStoredValue(value);
        // Update the value in Local Storage
        // window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    };
  
    return [storedValue, setValue];
  };

export default useLocalStorage;