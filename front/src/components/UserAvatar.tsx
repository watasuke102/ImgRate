// ImGrate - Image gallery rated by favorites and comments
// index.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {Avatar, Flex, Text} from '@chakra-ui/react';

interface Props {
  user_name: string;
}
export function UserAvatar(props: Props): JSX.Element {
  return (
    <Flex gap={4} alignItems={'center'}>
      <Avatar />
      <Text fontSize={'4xl'} transform={'translateY(-2px)'}>
        {props.user_name}
      </Text>
    </Flex>
  );
}
