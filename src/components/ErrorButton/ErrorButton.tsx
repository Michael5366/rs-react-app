import { useState } from 'react';
import ButtonTemplate from '../Templates/ButtonTemplate/ButtonTemplate';
import BrokenComponent from './BrokenComponent';

const ErrorButton = () => {
  const [throwError, setThrowError] = useState(false);

  const handleError = () => {
    setThrowError(true);
  };

  return throwError ? (
    <BrokenComponent />
  ) : (
    <ButtonTemplate className="app__error-btn" onClick={handleError}>
      Error button
    </ButtonTemplate>
  );
};

export default ErrorButton;
