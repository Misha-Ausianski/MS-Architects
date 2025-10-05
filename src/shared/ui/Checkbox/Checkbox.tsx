import { ComponentProps } from 'react';
import cls from './Checkbox.module.scss';
export default function Checkbox(props: ComponentProps<'input'>) {
  return <input type="checkbox" className={cls.checkbox} {...props} />;
}
