import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/css/Header.module.css'; // CSS 모듈 불러오기
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@mui/material';

function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={styles.header}>
            <div className={styles.logoSection}>
                <Link to="/" className={styles.logoLink}>
                    <img src="logo.png" alt="Logo" className={styles.logo} />
                    <h1 className={styles.title}>왜 떨어졌니?</h1>
                </Link>
            </div>
            <div className={styles.buttonSection}>
                {isLoggedIn ? (
                    <>
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={e => navigate('/mypage')}
                            size="large"
                            style={{
                                fontWeight: 'bold',
                                marginRight: '10px',
                            }}
                            sx={{
                                boxShadow: 'none',
                            }}
                        >
                            My Page
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            style={{ fontWeight: 'bold' }}
                            sx={{
                                boxShadow: 'none',
                            }}
                            onClick={handleLogoutClick}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="outlined"
                            color="success"
                            size="large"
                            style={{
                                fontWeight: 'bold',
                                marginRight: '10px',
                            }}
                            sx={{
                                boxShadow: 'none',
                            }}
                            onClick={e => navigate('/signup')}
                        >
                            Sign Up
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            style={{ fontWeight: 'bold' }}
                            sx={{
                                boxShadow: 'none',
                            }}
                            onClick={e => navigate('/login')}
                        >
                            Login
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
