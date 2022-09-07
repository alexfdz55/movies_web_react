import { Button, Tab, Tabs, TextField } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import '../../App.css'
import { createTheme, ThemeProvider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/CustomPagination/CustomPagination';


const Search = () => {

  const [type, setType] = useState(0);

  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState('');

  const [content, setContent] = useState();

  const [numOfPages, setNumOfPages] = useState();


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff'
      }
    }
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page])

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{
          display: 'flex',
          marginLeft: 10,
          marginTop: 15,
        }}>
          <TextField
            style={{ flex: 1 }}
            className='searhBox'
            label='Search'
            variant='filled'
            onChange={(e) => setSearchText(e.target.value)}
            onSubmit = {fetchSearch}
            onKeyDown = {(e)=> {
              // console.log(e.key);
              if(e.key == 'Enter'){
                fetchSearch();
              }
            }}
          />
          <Button
            variant='contained'
            style={{ marginLeft: 10 }}
            onClick = {fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          style={{ paddingBottom: 5 }}
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{ width: '50%' }} label='Searh Movies' />
          <Tab style={{ width: '50%' }} label='Searh TV Series' />
        </Tabs>
      </ThemeProvider>
      <div className='trending'>
        {content && content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={type ? 'tv' : 'movie'}
            vote_average={c.vote_average}
          />
        ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
        }
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Search