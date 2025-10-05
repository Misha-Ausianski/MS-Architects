import HeroSlider from '@widgets/HeroSlider/HeroSlider';
import { useProjects } from '@entities/project/api/queries';

export default function HomePage() {
  const { data } = useProjects({});
  const items = (data?.items ?? []).slice(0, 3);
  return <HeroSlider items={items} />;
}
