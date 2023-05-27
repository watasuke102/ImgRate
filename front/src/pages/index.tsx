import { PictureCard } from '@/components/PictureCard';
import {SimpleGrid} from '@chakra-ui/react';

export default function Home(): JSX.Element {
  return <SimpleGrid padding={8} gap={4} minChildWidth={256}>
    {[...Array(5)].map((_, i) => <PictureCard key={i} img_src='/dummy.png' />) }
  </SimpleGrid>;
}
