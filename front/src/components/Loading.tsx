// ImGrate - Image gallery rated by favorites and comments
// Loading.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {Center, Spinner} from '@chakra-ui/react';

export function Loading(): JSX.Element {
  return (
    <Center width='100dvw' height='100dvh'>
      <Spinner color='green' size='xl' />
    </Center>
  );
}
