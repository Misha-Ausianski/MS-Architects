import React, { forwardRef } from 'react';
import cls from './Textarea.module.scss';

type Props = React.ComponentPropsWithoutRef<'textarea'>;

const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { className, rows = 4, ...rest }, ref
) {
  return <textarea ref={ref} className={`${cls.textarea} ${className ?? ''}`} rows={rows} {...rest} />;
});

export default Textarea;
