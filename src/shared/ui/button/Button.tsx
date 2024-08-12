import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

// TODO: заменить на MUI component
export const Button: React.FC<Partial<ButtonHTMLAttributes<HTMLButtonElement>> & { buttonType?: 'primary' | 'secondary', size?: 'medium' | 'small' }> = ({
  className,
  children,
  buttonType = 'primary',
  size = 'medium',
  ...props
}) => {
  const defaultClassName = classNames('inline-flex justify-center items-center rounded-3xl font-bold disabled:bg-dark-600', size === 'small' ? 'min-w-12 h-8 p-2 text-xs' : 'min-w-40 h-14 p-4');
  const defaultClassNamePrimary = 'bg-primary-400 hover:bg-primary-300 active:bg-primary-200';
  const defaultClassNameSecondary = 'border-2 border-primary-400 hover:border-primary-300 active:border-primary-200 disabled:border-0';
  const defaultClassNameFinal = classNames(defaultClassName, buttonType === 'primary' ? defaultClassNamePrimary : defaultClassNameSecondary);

  return (
    <button className={`${defaultClassNameFinal} ${className ?? ''}`} {...props} >
      {children}
    </button>
  );
};
