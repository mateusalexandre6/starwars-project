import { createTheme } from '@mui/material/styles';

const starWarsTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffcc00',
    },
    secondary: {
      main: '#d32f2f',
    },
    background: {
      default: '#000',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffcc00',
    },
  },
  typography: {
    fontFamily: 'Star Jedi, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
  },
});

export default starWarsTheme;
