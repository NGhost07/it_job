import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#ff1744',
            contrastText: 'FFFFFF'
        }
    }
})

export default theme