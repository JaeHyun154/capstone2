import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Signup from './pages/Signup';
import Upload from './pages/Upload';
import './App.css';
import './assets/css/common.css';
import '@fontsource/roboto';

import Login from './pages/Login';
import Landing from './pages/Landing';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrviateRoute';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MyPage from './pages/MyPage';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    palette: {
        primary: {
            main: '#4caf50',
        },
    },
});

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/upload" element={<Upload />} />
                            <Route path="/mypage" element={<MyPage />} />
                        </Route>
                    </Routes>
                </div>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
