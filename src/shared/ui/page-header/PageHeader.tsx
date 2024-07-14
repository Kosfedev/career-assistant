import React from 'react';
import classNames from 'classnames';

export const PageHeader: React.FC<Partial<HTMLTitleElement>> = ({ children, className, ...props }) => {
  const combinedClassName = classNames('text-2xl font-bold', className);

  return <h2 className={combinedClassName} {...props}>{children}</h2>;
};
