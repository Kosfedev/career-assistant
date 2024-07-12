import React from 'react';

export const Button: React.FC<Partial<HTMLButtonElement>> = ({ className, children, ...props }) => {
  const defaultClassName = 'min-w-40 h-14 p-4 rounded-3xl bg-primary-400 hover:bg-primary-300 active:bg-primary-200 disabled:bg-dark-600 font-bold';

  return (
    <button className={`${defaultClassName} ${className ?? ''}`} {...props} >
      {children}
    </button>
  );
};
