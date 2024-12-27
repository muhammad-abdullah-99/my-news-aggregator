import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Preferences from "./pages/Preferences/Preferences";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      < Router >
        <Header />
        < main >
          <Routes>
            <Route path="/" element={< Home />} />
            < Route path="/preferences" element={< Preferences />} />
          </Routes>
        </main>
        < Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;