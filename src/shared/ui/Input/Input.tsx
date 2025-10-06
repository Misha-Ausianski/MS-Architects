import React, { forwardRef } from 'react';
import cls from './Input.module.scss';

type Props = React.ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...rest }, ref
) {
  return <input ref={ref} className={`${cls.input} ${className ?? ''}`} {...rest} />;
});

export default Input;
