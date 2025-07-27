import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

const useLocalStorage = (
  key: string = '',
  initialValue: string = ''
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);

    return item ? item : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
