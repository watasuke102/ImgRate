import {PictureCard} from '@/components/PictureCard';
import {SetUserNameModal} from '@/components/SetUserNameModal';
import {get_user_name} from '@/utils/LocalStorage';
import {Center, SimpleGrid, Spinner} from '@chakra-ui/react';
import React from 'react';

export default function Home(): JSX.Element {
  // FIXME: why should I do this
  const [user_name, set_user_name] = React.useState<string | null | 0>(0);

  React.useEffect(() => {
    set_user_name(get_user_name);
  }, []);

  if (user_name === 0) {
    return (
      <Center width='100dvw' height='100dvh'>
        <Spinner color='green' size='xl' />
      </Center>
    );
  }

  if (user_name === null) {
    return <SetUserNameModal is_open={true} />;
  }

  return (
    <SimpleGrid padding={8} gap={4} minChildWidth={256}>
      {[...Array(5)].map((_, i) => (
        <PictureCard key={i} img_src='/dummy.png' />
      ))}
    </SimpleGrid>
  );
}
