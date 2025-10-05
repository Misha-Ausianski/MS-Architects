import cls from './Textarea.module.scss';
import { ComponentProps } from 'react';
export default function Textarea(props: ComponentProps<'textarea'>) {
  return <textarea className={cls.textarea} rows={4} {...props} />;
}
