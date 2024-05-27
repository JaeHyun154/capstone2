import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AnimationImage() {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 1000),
            setTimeout(() => setStage(2), 2000),
            setTimeout(() => setStage(3), 4000),
        ];
        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, []);

    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleButtonClick = () => {
        navigate('/upload'); // 업로드 페이지로 이동
    };

    if (stage === 1) {
        return <img src="man1.png" alt="Man 1" className="man man1" />;
    } else if (stage === 2) {
        return <img src="man2.png" alt="Man 2" className="man man2" />;
    } else if (stage === 3) {
        return (
            <>
                <img src="man3.png" alt="Man 3" className="man man3" />
                <button className="mainImageButton" onClick={handleButtonClick}>
                    내 영상 분석
                </button>
            </>
        );
    }
}

export default AnimationImage;
