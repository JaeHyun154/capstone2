import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 통해 페이지 이동
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate로 페이지 이동 함수 생성

    // 상태 값 초기화 함수
    const resetForm = () => {
        setUsername('');
        setEmail('');
        setUserID('');
        setPassword('');
    };

    // 폼 제출 핸들러
    const handleSubmit = async event => {
        event.preventDefault();
        const userData = {
            username,
            email,
            userID,
            password,
        };

        try {
            const response = await axios.post('users/signup', userData);

            // 서버의 응답 메시지에 따라 분기 처리
            if (response.data.message === 'SUCCESS') {
                alert('회원가입에 성공하였습니다!');
                navigate('/'); // 메인 화면으로 이동
            } else if (response.data.message === 'USER_ALREADY_EXISTS') {
                alert('이미 가입된 아이디입니다!');
                resetForm(); // 폼 초기화
            } else {
                alert('회원가입에 실패하였습니다.');
                resetForm(); // 폼 초기화
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message); // 에러 응답 출력
            alert('회원가입 중 오류가 발생했습니다.');
            resetForm(); // 폼 초기화
        }
    };

    return (
        <div className="page">
            <img src="main.png" alt="Main" className="mainImage" />
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="title">Sign Up</h2>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
