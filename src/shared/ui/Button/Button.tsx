import cls from './Button.module.scss';
import { ComponentProps } from 'react';
type Props = ComponentProps<'button'> & { variant?: 'primary' | 'ghost' | 'link' };
export default function Button({ variant = 'primary', className = '', ...rest }: Props) {
  return <button className={[cls.btn, cls[variant], className].join(' ')} {...rest} />;
}
