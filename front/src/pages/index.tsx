// ImGrate - Image gallery rated by favorites and comments
// index.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {ErrorModal} from '@/components/ErrorModal';
import {Loading} from '@/components/Loading';
import {PictureCard} from '@/components/PictureCard';
import {ProfileDrawer} from '@/components/ProfileDrawer';
import {SetUserNameModal} from '@/components/SetUserNameModal';
import {UserAvatar} from '@/components/UserAvatar';
import {get_user_name} from '@/utils/LocalStorage';
import {useUserFavorites} from '@/utils/api';
import {HamburgerIcon} from '@chakra-ui/icons';
import {Container, Flex, IconButton, SimpleGrid, Spacer, useDisclosure} from '@chakra-ui/react';
import fs from 'fs';
import {GetServerSideProps} from 'next';
import React from 'react';

interface Props {
  file_names: string[];
}

export default function Home(props: Props): JSX.Element {
  // FIXME: why should I do this
  const [user_name, set_user_name] = React.useState<string | null | 0>(0);
  const user_favorites = useUserFavorites();
  const {isOpen, onOpen, onClose} = useDisclosure();

  React.useEffect(() => {
    (async () => {
      set_user_name(get_user_name);
    })();
  }, []);

  if (user_name === 0) {
    return <Loading />;
  }

  if (user_name === null) {
    return <SetUserNameModal is_open={true} />;
  }

  if (user_favorites.state === 'err') {
    return <ErrorModal message='Failed to get favorite status' />;
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
          {props.file_names.map((name, i) => (
            <PictureCard key={i} img_name={name} index={i} favorites={user_favorites} />
          ))}
        </SimpleGrid>
      </Container>
      <ProfileDrawer user_name={user_name} is_open={isOpen} close={onClose} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      file_names: fs.readdirSync('./public/pic').filter(name => /.+\.(png|jpg)/.test(name)),
    },
  };
};
