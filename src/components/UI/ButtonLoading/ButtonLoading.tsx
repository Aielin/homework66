import React from 'react';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner.tsx';
interface Props {
  isLoading: boolean;
  text: string;
  type?: 'button' | 'submit';
}


const ButtonLoading: React.FC<Props> = ({ isLoading, text, type = 'button' }) => {
  return (
    <button disabled={isLoading} type={type} className="btn btn-primary d-flex align-items-center">
      <span className="me-2">{text}</span>
      {isLoading ? <ButtonSpinner /> : null} {}
    </button>
  );
};

export default ButtonLoading;
