import type ErrorMsgProps from './interface';

const ErrorMsg = ({ errorMsg }: ErrorMsgProps) => {
  return (
    <div className="app__error">
      <p className="app__error-text">{errorMsg}</p>
    </div>
  );
};

export default ErrorMsg;
