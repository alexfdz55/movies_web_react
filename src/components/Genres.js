import { Chip, createTheme, ThemeProvider } from '@mui/material';

import axios from 'axios'
import React, { useEffect } from 'react'

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});

function Genres({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage,
}) {


    const handleAdd = (genre)=> {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g)=> g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
      };

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setGenres(data.genres);
    }



    useEffect(() => {
        fetchGenres();
        // eslint-disable-next-line
    }, [])


    return (
        <div style={{ padding: '6px 0' }}>
            {selectedGenres && selectedGenres.map((genre) => (
                <ThemeProvider theme={darkTheme}>
                    <Chip
                        key={genre.id}
                        label={genre.name}
                        style={{ margin: 2 }}
                        clickable
                        color = 'primary'
                        size= 'small'
                        onDelete={() => handleRemove(genre)}
                        // color='primary'
                    />
                </ThemeProvider>
            ))}
            {genres && genres.map((genre) => (
                <ThemeProvider theme={darkTheme}>
                    <Chip
                        key={genre.id}
                        label={genre.name}
                        style={{ margin: 2 }}
                        clickable
                        size= 'small'
                        onClick = {()=> handleAdd(genre)}
                        // color='primary'
                        
                    />
                </ThemeProvider>
            ))}

        </div>
    )
}

export default Genres