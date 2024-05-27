import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/Upload.css';

function Upload() {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const mainImageRef = useRef(null);
    const uploadContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleFileChange = event => {
        if (event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (file) {
            console.log('Uploading file:', file);
            // 파일 업로드 처리 로직 추가
        } else {
            alert('Please select a file to upload.');
        }
    };

    const handleDragOver = event => {
        event.preventDefault();
        if (!dragging) {
            setDragging(true);
        }
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = event => {
        event.preventDefault();
        setDragging(false);
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current.value = null; // 파일 입력 초기화
        fileInputRef.current.click();
    };

    // useEffect(() => {
    //     const updatePosition = () => {
    //         if (mainImageRef.current && uploadContainerRef.current) {
    //             const mainImageHeight = mainImageRef.current.clientHeight;
    //             const uploadContainerHeight =
    //                 uploadContainerRef.current.clientHeight;
    //             const offsetTop =
    //                 (mainImageHeight - uploadContainerHeight) / 2 + 25; // 중간 정도로 조정
    //             uploadContainerRef.current.style.top = `${offsetTop}px`;
    //         }
    //     };

    //     updatePosition();
    //     window.addEventListener('resize', updatePosition);

    //     return () => {
    //         window.removeEventListener('resize', updatePosition);
    //     };
    // }, []);

    return (
        <div className="page">
            <img
                ref={mainImageRef}
                src="main.png"
                alt="Main"
                className="main-image"
            />
            <div
                className={`upload-container ${dragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                ref={uploadContainerRef}
            >
                <h2>영상 업로드</h2>
                <p className="drag-drop-text">
                    {file ? file.name : '분석할 영상을 여기에 드래그하세요'}
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    <button type="button" onClick={handleClick}>
                        파일 선택
                    </button>
                    <button type="submit">업로드</button>
                </form>
            </div>
        </div>
    );
}

export default Upload;
