// ImGrate - Image gallery rated by favorites and comments
// _app.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {ChakraProvider} from '@chakra-ui/react';
import {AppProps} from 'next/app';
import '@/common/global.css';
import {theme} from '@/common/theme';

export default function RootLayout(props: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <props.Component {...props.pageProps} />
    </ChakraProvider>
  );
}
