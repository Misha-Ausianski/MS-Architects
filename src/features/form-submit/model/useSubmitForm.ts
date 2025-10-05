import { useMutation } from '@tanstack/react-query';

export function useSubmitForm(type: 'callback'|'resume'|'cooperate') {
  return useMutation({
    mutationFn: async (values: any) => {
      // MOCK: имитация отправки с задержкой и записью в localStorage
      await new Promise(res => setTimeout(res, 800));
      const prev = JSON.parse(localStorage.getItem('form_submissions') || '[]');
      prev.push({ type, values, at: new Date().toISOString() });
      localStorage.setItem('form_submissions', JSON.stringify(prev));
      return { ok: true };
    },
  });
}
