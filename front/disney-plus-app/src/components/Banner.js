import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import requests from '../api/request'

import './Banner.css'
import styled from 'styled-components'

const Banner = () => {

    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);


    useEffect(() => {

        return () => {

        }
    }, [])


    useEffect(() => {
        fetchData();
        return () => {
        }
    }, [])

    const fetchData = async () => {
        // axios는 비동기 처리이기 때문에 처리안된상황에서는 Pending 상태라한다.
        // 그렇기에 받은 다음에 처리해야되는데 방법이 두개
        // 1. fetch - then (마치 promise -then)
        // 2. async - await << 당연히 이거

        // 현재 상영중인 영화정보를 가져오기
        const response = await axios.get(requests.fetchNowPlaying);
        // 상영중인 영화중에 랜덤하게 하나의 ID가져오기
        const movieId = response.data.results[
            Math.floor(Math.random() * response.data.results.length)
        ].id;
        // 램덤으로 뽑힌 특정영황의 자세한 정보 요청 (비디오 정보포함)
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: 'videos ' }
        })

        console.log(movieDetail);

        setMovie(movieDetail);
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substring(0, n) + '...' : str;
    }

    if (isClicked) {
        <>
            <Container>
                <HomeContainer>
                    <Iframe
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                        width="640"
                        height="360"
                        frameborder="0"
                        allow="autoplay; fullscreen"
                    ></Iframe>
                </HomeContainer>
            </Container>
            <button onClick={() => setIsClicked(false)}>X</button>
        </>
    } else {
        return (
            <header
                className='banner'
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover"
                }}
            >
                <div className='banner__contents'>
                    <h1 className='banner__title'>
                        {movie.title || movie.name || movie.orignal_name}
                    </h1>
                    <div className='banner__buttons'>
                        {movie?.videos?.results[0]?.key &&
                            <button
                                className='banner__button play'
                                onClick={() => setIsClicked(true)}
                            >
                                Play
                            </button>
                        }
                    </div>
                    <p className='banner_description'>
                        {truncate(movie.overview, 100)}
                    </p>
                    <div className='banner--fadeBottom' />
                </div>
            </header>
        )
    }
}

export default Banner


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1; 
    opacity: 0.65;
    border: none;

    &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    }
`;