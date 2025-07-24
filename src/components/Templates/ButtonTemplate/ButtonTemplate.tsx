import type Button from './interface';

const ButtonTemplate = ({ className, type, onClick, children }: Button) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonTemplate;
