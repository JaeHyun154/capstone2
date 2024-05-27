import React, { useState } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import '../assets/css/common.css';
import VideoModal from '../components/VideoModal';

function MyPage() {
    const movieList = [
        { id: 'movie1', title: '24/04/14', description: 'ㅁㅁ클라이밍장에서 도전' },
        { id: 'movie2', title: '24/04/28', description: '친구와 함께 ㅇㅇ클라이밍장' },
        { id: 'movie3', title: '24/05/15', description: 'XX클라이밍장' },
    ]; // 비디오 목록

    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleCardClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className="page">
            <img src="main.png" alt="Main" className="main-image" /> {/* 메인 이미지 배경 */}
            <div className="thumbnail-grid">
                {movieList.map((movie, index) => (
                    <ThumbNail key={index} index={index} movie={movie} onClick={handleCardClick} />
                ))}
            </div>
            {selectedMovie && (
                <VideoModal
                    movie={selectedMovie}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

function ThumbNail({ index, movie, onClick }) {
    const handleClick = () => {
        onClick(movie);
    };

    return (
        <Card sx={{ maxWidth: 345, height: '400px' }} onClick={handleClick}>
            <CardActionArea sx={{ height: '100%' }}>
                <CardMedia
                    component="img"
                    height="240"
                    image={`/images/image${index}.png`}
                    alt={movie.title}
                />
                <CardContent sx={{ height: '160px', overflow: 'auto' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default MyPage;
