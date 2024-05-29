import React from 'react';
import '../assets/css/WarningModal.css';

const WarningModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>업로드 주의사항</h2>
                <div className="examples">
                    <div className="example">
                        <img src={`${process.env.PUBLIC_URL}/Warning1.jpeg`} alt="올바른 예시" />
                        <p>올바른 예시</p>
                    </div>
                    <div className="example">
                        <img src={`${process.env.PUBLIC_URL}/Warning2.jpeg`} alt="잘못된 예시" />
                        <p>잘못된 예시</p>
                    </div>
                </div>
                <p className="instruction">
                    1. 영상을 찍을 때, 보드를 정면에서 찍어주세요. 사이드에서 찍을 시 정확한 분석이 어렵습니다.<br/>
                    2. 등반 시, 되도록이면 팔 다리가 몸에 겹치지 않게 등반해주세요.<br/>
                    3. 영상을 업로드할 때 문제를 꼭 선택해주세요.
                </p>
                <button onClick={onClose}>확인</button>
            </div>
        </div>
    );
};

export default WarningModal;
