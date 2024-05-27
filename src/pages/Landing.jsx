import React, { useState, useRef, useEffect } from 'react'; // useRef 추가
import '../assets/css/Landing.css'; // CSS 파일 로드
import AnimationImage from '../components/Landing/AnimationImage';
import HolderModal from '../components/Landing/HolderModal';

function Landing() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const [stage, setStage] = useState(0);
    const imageRef = useRef(null);
    const [buttonSize, setButtonSize] = useState(0);
    useEffect(() => {
        function updateButtonSize() {
            if (imageRef.current) {
                const width = imageRef.current.clientWidth;
                const minButtonWidth = 120;
                const buttonWidth = Math.max(width * 0.25, minButtonWidth);
                setButtonSize(buttonWidth);
            }
        }

        window.addEventListener('resize', updateButtonSize);
        updateButtonSize();

        return () => {
            window.removeEventListener('resize', updateButtonSize);
        };
    }, []);

    // 각 이미지의 슬라이드 배열 정의 (a, b, c, d 각각 2장씩)

    // 각 이미지에 대한 ref 생성
    const refs = useRef([...Array(4)].map(() => React.createRef()));
    const mainImageRef = useRef();

    const handleMouseEnter = ref => {
        if (ref.current) {
            ref.current.style.transform = 'scale(1.5) rotateY(20deg)';
        }
    };

    const handleMouseLeave = ref => {
        if (ref.current) {
            ref.current.style.transform = 'scale(1) rotateY(0)';
        }
    };

    const handleImageClick = index => {
        setSelectedImageIndex(index);
        setCurrentSlideIndex(0); // 첫 번째 슬라이드로 초기화
        setModalOpen(true);
    };

    return (
        <div className="mainImageContainer">
            <img
                ref={mainImageRef}
                src="main.png"
                alt="Main Content"
                className="mainImage"
            />
            {[...Array(4).keys()].map(index => (
                <img
                    key={index}
                    ref={refs.current[index]}
                    src={`${String.fromCharCode(97 + index)}.png`}
                    alt={`Interactive Element ${String.fromCharCode(
                        97 + index,
                    )}`}
                    className={`interactiveImage interactiveImage-${String.fromCharCode(
                        97 + index,
                    )}`}
                    onMouseEnter={() => handleMouseEnter(refs.current[index])}
                    onMouseLeave={() => handleMouseLeave(refs.current[index])}
                    onClick={() => handleImageClick(index)}
                />
            ))}
            <AnimationImage stage={stage} />
            {isModalOpen && (
                <HolderModal
                    setModalOpen={setModalOpen}
                    selectedImageIndex={selectedImageIndex}
                    currentSlideIndex={currentSlideIndex}
                    setCurrentSlideIndex={setCurrentSlideIndex}
                />
            )}
        </div>
    );
}

export default Landing;
