import Hero from '@widgets/Hero/Hero';
import { useServices } from '@entities/service/api/queries';

export default function ServicesLandingPage() {
  const { data } = useServices();
  const items = (data?.items ?? []).map(s => ({ id: s.id, title: s.title, slug: s.slug }));
  return (
    <>
      <Hero
        image="https://placehold.co/1600x900?text=Services+Hero"
        title="Услуги"
        items={items}
      />
    </>
  );
}
