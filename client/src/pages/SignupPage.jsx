import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material"
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signup } from "../redux/authSlice";

const SignupPage = () => {
  const role = 'USER';
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(signup({email, password, role}))
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
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          borderRadius: 2,
        px: 4,
        py: 6,
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
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignupPage
