import { Link, Box, Button, Container, Grid, TextField, Typography, AppBar } from "@mui/material"
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from "../redux/authSlice";

const SigninPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(signin({email, password}))
    .unwrap()
    .then(() => {
      navigate('/')
    })

    setEmail('');
    setPassword('');
  }

  const handleClickLogo = () => {
    navigate('/')
  }

  return (
    <>
    <Container component="main" maxWidth="sm">
      <AppBar/>
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button 
          color='inherit' 
          sx={{
            bgcolor: 'red', 
            padding: '10px 30px 10px', 
            mb: '10px',
          }}
          onClick={handleClickLogo}
        >
          <ScreenSearchDesktopIcon />
          <Typography pl={1} sx={{fontWeight: ''}}>IT-JOB</Typography>
        </Button>
        <Typography component="h1" variant="h4">
          Welcome to IT-Job
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Button 
            type="submit"
            fullWidth
            variant='outlined'
            sx={{ mt: 2, mb: 2 }}
          >
            Signin With Google
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </>
  )
}

export default SigninPage
