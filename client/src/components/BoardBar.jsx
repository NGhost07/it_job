import { AppBar, Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { filterJob, getAllJobs } from '../redux/jobsSlice'

const suggestions=[
    {id: 1, label: 'Java Script'},
    {id: 2, label: 'Reactjs'},
    {id: 3, label: '.NET'},
    {id: 4, label: 'Tester'},
    {id: 5, label: 'Nestjs'},
    {id: 6, label: 'Redux'},
]

const BoardBar = () => {
    const dispatch = useDispatch();

    const [city, setCity] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const jobs = useSelector((state) => state.jobs.jobs);

    useEffect(() => {
        if(!searchInput && !jobs){
          dispatch(getAllJobs());
        }
    }, [dispatch, jobs, searchInput])

    const handleChangeCity = () => {}

    const handleSearchClick = async (event) => {
        event.preventDefault();
        dispatch(filterJob(searchInput))

        setSearchInput('')
    }
      
  return (
    <AppBar sx={{
        position: 'static',
        mt: '64px',
        alignItems: 'center',
        bgcolor: 'rgb(33,5,5)',
        width: '100vw',
        pb: '10px'
    }}>
        <Typography sx={{
            mt: 2,
            mb: 1,
            fontSize: '1.5rem',
            fontWeight: 'bold'
        }}>
            Find your jobs here!
        </Typography>
        <Toolbar sx={{
            color: 'primary'
        }}>
            <Box sx={{ minWidth: 120 , mr: 5}}>
                <FormControl fullWidth>
                    <InputLabel id="select-city-label">City</InputLabel>
                    <Select
                        labelId="select-city-label"
                        id="select-city-label"
                        value={city}
                        label="City"
                        onChange={handleChangeCity}
                        sx={{
                            bgcolor: 'white'
                        }}
                    >
                        <MenuItem value={1} onClick={(e) => setCity(e.target.value)}>Hanoi</MenuItem>
                        <MenuItem value={2} onClick={(e) => setCity(e.target.value)}>Moscow</MenuItem>
                        <MenuItem value={3} onClick={(e) => setCity(e.target.value)}>St. Petersburg</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TextField
                id="search"
                type="search"
                label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                sx={{ width: 600 , mr: 5, bgcolor: 'white'}}
            />
            <Button sx={{ bgcolor: 'red' , pl: 3, pr: 3, "&:hover": {bgcolor: '#3d5afe'}}} onClick={handleSearchClick}>
                <SearchIcon sx={{
                    fontSize: '2.7rem',
                    color: 'White',
                }}/>
            </Button>
        </Toolbar>
        <Toolbar>
            <Typography sx={{
                mr:3,
                fontWeight: 'bold',
                fontSize: '1.2rem'
            }}>
                Suggestions for you:
            </Typography>
            <div className='suggestions-container'>
                {suggestions.map((suggestion) => (
                    <Chip 
                    onClick={async (event) => {
                        event.preventDefault();
                        dispatch(filterJob(suggestion.label))
                    }}
                    key={suggestion.id} 
                    label={suggestion.label} 
                    variant='outlined'
                    sx={{
                        color: 'white',
                        ml: 3,
                        fontSize: '1.02rem'
                    }}
                    />
                ))}
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default BoardBar
