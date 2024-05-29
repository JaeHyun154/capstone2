import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/Upload.css';
import WarningModal from '../components/WarningModal';

function Upload() {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const mainImageRef = useRef(null);
    const uploadContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleFileChange = event => {
        if (event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('YOUR_S3_UPLOAD_URL', formData, { // 형 여기다가 s3 업로드 url 넣으면 대.
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    console.log('File uploaded successfully.');
                    alert('File uploaded successfully.');
                } else {
                    console.error('Failed to upload file.');
                    alert('Failed to upload file.');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file.');
            }
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

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="page">
            <img
                ref={mainImageRef}
                src="main.png"
                alt="Main"
                className="main-image"
            />
            {showModal && <WarningModal onClose={handleCloseModal} />}
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
