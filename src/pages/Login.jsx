import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Box } from '@mui/material';

function Login() {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async event => {
        event.preventDefault();
        const loginData = {
            userID,
            password,
        };

        try {
            // const response = await axios.post(
            //     '여기다가 주소 적어줘',
            //     loginData,
            // );
            const response = { status: 200 }; // 임시 응답

            // 성공적인 응답 처리
            if (response.status === 200) {
                alert('Login Success');
                login(); // 로그인 상태 업데이트
                navigate('/'); // 메인 화면으로 리디렉션
            } else {
                alert('Login Failed');
                setErrorMessage('Login failed. Please try again.');
            }
        } catch (error) {
            console.error(
                'Login failed:',
                error.response?.data || error.message,
            );
            alert('Login Failed');
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="page">
            <img src="main.png" alt="Main" className="mainImage" />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <form className="form" onSubmit={handleLogin}>
                    <h2 className="title">Login</h2>
                    <input
                        type="text"
                        placeholder="UserID"
                        value={userID}
                        onChange={e => setUserID(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </Box>
            {errorMessage && <p className="error">{errorMessage}</p>}{' '}
        </div>
    );
}

export default Login;
