// ImGrate - Image gallery rated by favorites and comments
// index.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {Loading} from '@/components/Loading';
import {PictureCard} from '@/components/PictureCard';
import {ProfileDrawer} from '@/components/ProfileDrawer';
import {SetUserNameModal} from '@/components/SetUserNameModal';
import {UserAvatar} from '@/components/UserAvatar';
import {get_user_name} from '@/utils/LocalStorage';
import {useUserFavorites} from '@/utils/api';
import {HamburgerIcon} from '@chakra-ui/icons';
import {Container, Flex, IconButton, SimpleGrid, Spacer, useDisclosure} from '@chakra-ui/react';
import React from 'react';

export default function Home(): JSX.Element {
  // FIXME: why should I do this
  const [user_name, set_user_name] = React.useState<string | null | 0>(0);
  const user_favorites = useUserFavorites();
  const {isOpen, onOpen, onClose} = useDisclosure();

  React.useEffect(() => {
    (async () => {
      set_user_name(get_user_name);
    })();
  }, []);

  if (user_name === 0 || user_favorites.state !== 'ok') {
    return <Loading />;
  }

  if (user_name === null) {
    return <SetUserNameModal is_open={true} />;
  }

  return (
    <>
      <Container padding={8} maxW={'100dvw'}>
        <Flex marginBottom={4} paddingX={2} paddingY={1} alignItems={'center'} backgroundColor='white'>
          <UserAvatar user_name={user_name} />
          <Spacer />
          <IconButton aria-label='open profile menu' icon={<HamburgerIcon />} onClick={onOpen} />
        </Flex>
        <SimpleGrid gap={4} minChildWidth={256}>
          {[...Array(5)].map((_, i) => (
            <PictureCard key={i} img_src='/dummy.png' index={i} favorites={user_favorites} />
          ))}
        </SimpleGrid>
      </Container>
      <ProfileDrawer user_name={user_name} is_open={isOpen} close={onClose} />
    </>
  );
}
