import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material';
import Movies from './pages/Movies/Movies';
import Search from './pages/Search/Search';
import Series from './pages/Series/Series';
import Trending from './pages/Trending/Trending';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='app'>
        <Container>
          <Routes>
            <Route path='/' element = {<Trending/>}/>
            <Route path='/movies' element = {<Movies/>}/>
            <Route path='/series' element = {<Series/>}/>
            <Route path='/search' element = {<Search/>}/>
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>

  );
}

export default App;
