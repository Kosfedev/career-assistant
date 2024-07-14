import NextLink, { LinkProps } from 'next/link';
import React from 'react';

export const Link: React.FC<LinkProps & { className?: string }> = ({ className, children, ...props }) => {
  const defaultClassName = 'text-primary-500 hover:text-primary-400 active:text-primary-300';

  return <NextLink className={`${defaultClassName} ${className ?? ''}`} {...props} >{children}</NextLink>;
};
