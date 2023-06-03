// ImGrate - Image gallery rated by favorites and comments
// admin.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {ErrorModal, Loading} from '@/common';
import {AdminCommentTable, FavoriteStat} from '@/components/Admin';
import {useImages} from '@/utils/api';
import {Box, Card, CardBody, CardHeader, Flex, Heading, Image, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import React from 'react';

export default function Admin(): JSX.Element {
  const images = useImages();

  if (images.state === 'loading') {
    return <Loading />;
  }

  if (images.state === 'err') {
    return <ErrorModal message='Failed to get images' />;
  }

  return (
    <Stack gap={4} padding={8}>
      {images.data
        .sort((a, b) => b.favorite_cnt - a.favorite_cnt)
        .map((image, i) => (
          <Card key={i}>
            <CardHeader>
              <Heading size={'lg'}>{image.img_name}</Heading>
            </CardHeader>
            <CardBody>
              <SimpleGrid gap={4} templateColumns={'256px auto'} templateRows={'auto auto 1fr'}>
                <Image height={256} src={`/pic/${image.img_name}`} alt={image.img_name} gridRow={'1/4'} />
                <FavoriteStat favorite_cnt={image.favorite_cnt} />
                <Heading size={'lg'}>Comments</Heading>
                <AdminCommentTable comments={image.comments} />
              </SimpleGrid>
            </CardBody>
          </Card>
        ))}
    </Stack>
  );
}
