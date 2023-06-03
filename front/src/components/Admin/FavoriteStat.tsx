// ImGrate - Image gallery rated by favorites and comments
// FavoriteStat.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {StarIcon} from '@chakra-ui/icons';
import {Box, Flex, Heading, Stat, StatLabel, StatNumber} from '@chakra-ui/react';
import React from 'react';

interface Props {
  favorite_cnt: number;
}

export function FavoriteStat(props: Props): JSX.Element {
  return (
    <Box>
      <Stat>
        <StatLabel>
          <Flex gap={2} alignItems={'center'}>
            <StarIcon boxSize={6} />
            <Heading fontSize={'2xl'}>Favorite count</Heading>
          </Flex>
        </StatLabel>
        <StatNumber>{props.favorite_cnt}</StatNumber>
      </Stat>
    </Box>
  );
}
