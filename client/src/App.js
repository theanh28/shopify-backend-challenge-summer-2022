import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { SnackbarProvider } from 'notistack';

import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    display: 'flex',
    background: '#e6e6e6',
  },
}));

function App() {
  const classes = useStyles();
  const theme = createTheme();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <div className={classes.root}>
            <Sidebar />
            <Main />
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
