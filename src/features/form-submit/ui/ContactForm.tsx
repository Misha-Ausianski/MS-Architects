import { useForm } from 'react-hook-form';
import Input from '@shared/ui/Input/Input';
import Textarea from '@shared/ui/Textarea/Textarea';
import Checkbox from '@shared/ui/Checkbox/Checkbox';
import Button from '@shared/ui/Button/Button';
import { useSubmitForm } from '../model/useSubmitForm';
import cls from './ContactForm.module.scss';

type FormData = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  file?: FileList;
  consent: boolean;
};

export function ContactForm({ type }: { type: 'callback'|'resume'|'cooperate' }) {
  const { register, handleSubmit, formState: { isSubmitting, isSubmitSuccessful }, reset } =
    useForm<FormData>({ defaultValues: { consent: false } });
  const { mutateAsync } = useSubmitForm(type);

  const showExtra = type !== 'callback';
  const showFile  = type === 'resume';

  return (
    <form
      className={cls.form}
      onSubmit={handleSubmit(async (data) => { await mutateAsync(data); reset(); })}
    >
      <div className={cls.stack}>
        <div className={cls.field}>
          <label className={cls.label}>Имя</label>
          <Input className={cls.control} placeholder="Alexander" {...register('name', { required: true })} />
        </div>

        <div className={cls.field}>
          <label className={cls.label}>Номер телефона</label>
          <Input className={cls.control} placeholder="+7 (999) 000-0000" {...register('phone', { required: true })} />
        </div>

        {showExtra && (
          <div className={cls.field}>
            <label className={cls.label}>Email</label>
            <Input className={cls.control} placeholder="example@mail.ru" {...register('email')} />
          </div>
        )}

        {showExtra && (
          <div className={cls.field}>
            <label className={cls.label}>Сообщение</label>
            <Textarea className={`${cls.control} ${cls.textarea}`} placeholder="Коротко опишите запрос" {...register('message')} />
          </div>
        )}

        {showFile && (
          <div className={cls.field}>
            <label className={cls.label}>Резюме (файл)</label>
            <input className={`${cls.control} ${cls.file}`} type="file" {...register('file')} />
          </div>
        )}
      </div>

      <label className={cls.consent}>
        <Checkbox {...register('consent', { required: true })} />
        <span>Я соглашаюсь с политикой конфиденциальности</span>
      </label>

      <Button className={cls.submit} disabled={isSubmitting}>Оставить заявку</Button>

      {isSubmitSuccessful && <div className={cls.ok}>Заявка отправлена</div>}
    </form>
  );
}