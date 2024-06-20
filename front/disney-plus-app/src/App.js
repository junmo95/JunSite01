import './App.css';
import styled from 'styled-components';

import requests from './api/request'

import Banner from './components/Banner';
import Nav from './components/Nav';
import Category from './components/Category';
import Row from './components/Row';


function App() {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row title="Trending Now" id='TN' fetchUrl={requests.fetchTrending} />
      <Row title="Trending Now" id='TR' fetchUrl={requests.fetchTopRated} />
      <Row title="Trending Now" id='AM' fetchUrl={requests.fetchActionMovies} />
      <Row title="Trending Now" id='CM' fetchUrl={requests.fetchComedyMovies} />
    </Container>
  );
}

export default App;


const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/login-background.jpg") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`