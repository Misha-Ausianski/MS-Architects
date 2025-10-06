import React, { forwardRef } from 'react';
import cls from './Checkbox.module.scss';

type Props = React.ComponentPropsWithoutRef<'input'>;

const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { className, ...rest }, ref
) {
  return <input ref={ref} type="checkbox" className={`${cls.checkbox} ${className ?? ''}`} {...rest} />;
});

export default Checkbox;
