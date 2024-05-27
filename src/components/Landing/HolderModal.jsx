function HolderModal({
    setModalOpen,
    selectedImageIndex,
    currentSlideIndex,
    setCurrentSlideIndex,
}) {
    const slides = {
        a: ['a1.png', 'a2.png'],
        b: ['b1.png', 'b2.png'],
        c: ['c1.png', 'c2.png'],
        d: ['d1.png', 'd2.png'],
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleNextSlide = () => {
        const currentChar = String.fromCharCode(97 + selectedImageIndex); // a, b, c, d...
        const numSlides = slides[currentChar].length;

        setCurrentSlideIndex(prev => (prev + 1) % numSlides); // 순환 이동
    };

    const handlePrevSlide = () => {
        const currentChar = String.fromCharCode(97 + selectedImageIndex);
        const numSlides = slides[currentChar].length;

        setCurrentSlideIndex(prev => (prev - 1 + numSlides) % numSlides); // 순환 이동
    };

    return (
        <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={handleCloseModal}>
                    &times;
                </span>
                <img
                    src={
                        slides[String.fromCharCode(97 + selectedImageIndex)][
                            currentSlideIndex
                        ]
                    }
                    alt="Detailed Slide"
                    className="modalImage"
                />
                <button className="prevSlide" onClick={handlePrevSlide}>
                    &#10094;
                </button>
                <button className="nextSlide" onClick={handleNextSlide}>
                    &#10095;
                </button>
            </div>
        </div>
    );
}

export default HolderModal;
