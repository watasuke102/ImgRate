// ImGrate - Image gallery rated by favorites and comments
// index.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {Loading} from '@/components/Loading';
import {PictureCard} from '@/components/PictureCard';
import {SetUserNameModal} from '@/components/SetUserNameModal';
import {get_user_name} from '@/utils/LocalStorage';
import {useUserFavorites} from '@/utils/api';
import {getSdk} from '@/utils/graphql';
import {SimpleGrid} from '@chakra-ui/react';
import {GraphQLClient} from 'graphql-request';
import React from 'react';

export default function Home(): JSX.Element {
  // FIXME: why should I do this
  const [user_name, set_user_name] = React.useState<string | null | 0>(0);
  const user_favorites = useUserFavorites();

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
    <SimpleGrid padding={8} gap={4} minChildWidth={256}>
      {[...Array(5)].map((_, i) => (
        <PictureCard key={i} img_src='/dummy.png' index={i} favorites={user_favorites} />
      ))}
    </SimpleGrid>
  );
}
