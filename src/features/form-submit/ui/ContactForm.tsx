import { useForm } from 'react-hook-form';
import Input from '@shared/ui/Input/Input';
import Textarea from '@shared/ui/Textarea/Textarea';
import Checkbox from '@shared/ui/Checkbox/Checkbox';
import Button from '@shared/ui/Button/Button';
import { useSubmitForm } from '../model/useSubmitForm';
import style from './ContactForm.module.scss';
import { NavLink } from 'react-router-dom';

type FormData = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  file?: FileList;
  consent: boolean;
  resume?: string;
};

export function ContactForm({ type }: { type: 'callback' | 'resume' | 'cooperate' }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({ defaultValues: { consent: false } });
  const { mutateAsync } = useSubmitForm(type);

  const showCallback = type === 'callback';
  const showCooperate = type === 'cooperate';
  const showFile = type === 'resume';

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync(data);
        reset();
      })}
    >
      <div className={style.stack}>
        <div className={style.field}>
          <label className={style.label}>Имя</label>
          <Input
            className={style.control}
            placeholder="Иван Петров"
            {...register('name', { required: true })}
          />
        </div>

        {showCallback && (
          <div className={style.field}>
            <label className={style.label}>Номер телефона</label>
            <Input
              className={style.control}
              inputMode="numeric"
              onInput={(e) => {
                const target = e.currentTarget;
                target.value = target.value.replace(/[^\d+() -]/g, ''); // разрешаем цифры, +, (), пробел, дефис
              }}
              placeholder="+7 (999) 000-0000"
              {...register('phone', { required: true })}
            />
          </div>
        )}

        {showFile && (
          <>
            <div className={style.field}>
              <label className={style.label}>Email</label>
              <Input
                className={style.control}
                placeholder="info@msarchitects.ru"
                {...register('email', { required: true })}
              />
            </div>

            <div className={style.field}>
              <label className={style.label}>Ссылка на портфолио</label>
              <Input
                className={style.control}
                placeholder="https://msarchitects.ru/"
                {...register('resume', { required: true })}
              />
            </div>
          </>
        )}

        {showCooperate && (
          <div className={style.field}>
            <label className={style.label}>Сообщение</label>
            <Textarea placeholder="Коротко опишите запрос" {...register('message')} />
          </div>
        )}
      </div>

      <label className={style.consent}>
        <Checkbox {...register('consent', { required: true })} />
        <span>
          Я соглашаюсь с <NavLink to="/privacy">политикой конфиденциальности</NavLink>
        </span>
      </label>

      <Button className={style.submit} disabled={isSubmitting}>
        Оставить заявку
      </Button>

      {isSubmitSuccessful && <div className={style.ok}>Заявка отправлена</div>}
    </form>
  );
}
