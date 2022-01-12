import { useState } from 'react';

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (value?: boolean) => {
    value === undefined ? setValue((value) => !value) : setValue(value);
  };

  return { value, toggle };
};
