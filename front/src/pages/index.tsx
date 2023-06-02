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
import {SetUserNameModal} from '@/components/SetUserNameModal';
import {UserAvatar} from '@/components/UserAvatar';
import {get_user_name} from '@/utils/LocalStorage';
import {useUserComments, useUserFavorites} from '@/utils/api';
import {EditIcon} from '@chakra-ui/icons';
import {Card, CardBody, Container, Flex, IconButton, SimpleGrid, Spacer, useDisclosure} from '@chakra-ui/react';
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
  const user_comments = useUserComments();
  const {isOpen, onOpen, onClose} = useDisclosure();

  React.useEffect(() => {
    (async () => {
      set_user_name(get_user_name);
    })();
  }, []);

  if (user_name === 0 || user_favorites.state === 'loading' || user_comments.state === 'loading') {
    return <Loading />;
  }

  if (user_name === null) {
    return <SetUserNameModal is_open={true} />;
  }

  if (user_favorites.state === 'err' || user_comments.state === 'err') {
    return <ErrorModal message='Failed to get favorite status' />;
  }

  return (
    <>
      <Container padding={8} maxW={'100dvw'}>
        <Card direction={'row'} marginBottom={8}>
          <CardBody>
            <Flex alignItems={'center'}>
              <UserAvatar user_name={user_name} />
              <Spacer />
              <IconButton aria-label='open profile menu' icon={<EditIcon />} onClick={onOpen} />
            </Flex>
          </CardBody>
        </Card>
        <SimpleGrid gap={4} minChildWidth={256}>
          {props.file_names.map((name, i) => (
            <PictureCard
              key={i}
              img_name={name}
              favorites={user_favorites}
              comments={{...user_comments, comments: user_comments.comments.filter(e => e.commented_to === name)}}
            />
          ))}
        </SimpleGrid>
      </Container>
      <SetUserNameModal is_open={isOpen} close={onClose} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      file_names: fs.readdirSync('./public/pic').filter(name => /[^,]+\.(png|jpg)/.test(name)),
    },
  };
};
