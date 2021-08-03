import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    primaryDark: '#0C0C0F',
    primaryGray: '#1C1C1C',
    primaryLight: '#DADADA',
  },
  fonts: {
    heading: 'brandon-grotesque, sans-serif',
    body: 'mr-eaves-modern, sans-serif',
  },
  styles: {
    global: (props) => ({
      'html, body': {
        backgroundColor: props.colorMode === 'dark' ? 'primaryDark' : 'gray.50',
        color: props.colorMode === 'dark' ? 'primaryLight' : 'primaryDark',
        minHeight: '100vh',
      },
      body: {
        paddingBottom: '2rem',
      },
      '.bgWrap': {
        overflow: 'hidden',
        zIndex: '-1',
      },
      'h1,h2,h3,h4,h5': {
        fontWeight: '900',
      },
      '.bgText': {
        margin: '0',
        fontSize: '2rem',
        lineHeight: '3rem',
        textAlign: 'center',
        paddingTop: '40vh',
        textShadow: '1px 1px 1px #3c5c5e',
      },
    }),
  },
});

export default theme;
