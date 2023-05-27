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
