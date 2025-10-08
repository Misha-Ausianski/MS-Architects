import Tabs from '@shared/ui/Tabs/Tabs';
import { useState } from 'react';
import { ContactForm } from '@features/form-submit/ui/ContactForm';
import styles from './TabbedForm.module.scss';

type Variant = 'default' | 'embed';

export default function TabbedForm({ variant = 'default' }: { variant?: Variant }) {
  const [tab, setTab] = useState<'callback' | 'resume' | 'cooperate'>('callback');

  const items = [
    { value: 'callback', label: 'Обратный звонок' },
    { value: 'resume', label: 'Отправить резюме' },
    { value: 'cooperate', label: 'Обсудить сотрудничество' },
  ];

  return (
    <div className={styles.embed} data-bitrix-block="FORM">
      <div className={styles.head}>Мне нужно:</div>
      <Tabs items={items} value={tab} onChange={(v) => setTab(v as any)} />
      <div className={styles.card}>
        <ContactForm type={tab} />
      </div>
    </div>
  );
}
