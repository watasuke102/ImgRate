// ImGrate - Image gallery rated by favorites and comments
// PictureCard.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {get_user_name} from '@/utils/LocalStorage';
import {UserFavorites} from '@/utils/api';
import {getSdk} from '@/utils/graphql';
import {ChatIcon, StarIcon} from '@chakra-ui/icons';
import {Card, CardBody, CardFooter, Image, IconButton, Button, Spacer, useDisclosure} from '@chakra-ui/react';
import {GraphQLClient} from 'graphql-request';
import React from 'react';
import {CommentModal} from './CommentModal';

interface Props {
  img_src: string;
  index: number;
  favorites: UserFavorites;
}

export function PictureCard(props: Props): JSX.Element {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [refleshing, set_refleshing] = React.useState(false);

  const favorited = props.favorites.favorites.indexOf(props.index) !== -1;
  const update_favorite = React.useCallback(() => {
    set_refleshing(true);
    let favorite_list: number[];
    if (favorited) {
      favorite_list = props.favorites.favorites.filter(e => e !== props.index);
    } else {
      favorite_list = props.favorites.favorites.concat([props.index]);
    }
    (async () => {
      const client = new GraphQLClient('http://localhost:8080/query');
      const sdk = getSdk(client);
      await sdk.UpdateUser({name: get_user_name() ?? '', favorites: favorite_list.sort().join(',')});
      props.favorites.reflesh();
      set_refleshing(false);
    })();
  }, [props.favorites, props.index, favorited]);

  return (
    <>
      <Card w={256} margin={'auto'}>
        <CardBody>
          <Image src={props.img_src} alt='dummy' />
        </CardBody>
        <CardFooter>
          <Button aria-label='Comment' leftIcon={<ChatIcon />} onClick={onOpen}>
            Comment
          </Button>
          <Spacer />
          <IconButton
            aria-label='Favorite'
            icon={<StarIcon />}
            colorScheme={favorited ? 'yellow' : 'gray'}
            onClick={update_favorite}
            isLoading={refleshing || props.favorites.state !== 'ok'}
          />
        </CardFooter>
      </Card>

      <CommentModal is_open={isOpen} close={onClose} />
    </>
  );
}
