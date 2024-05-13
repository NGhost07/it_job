import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import { Container } from '@mui/material';
import SignupForEmployersPage from "./pages/SignupForEmployersPage";
import UserProfilePage from "./pages/UserProfilePage";
import Dasboard from "./pages/Dasboard";
import CompanyDasboard from "./pages/CompanyDasboard";

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/employer' element={<SignupForEmployersPage />} />
            <Route path='/signin' element={<SigninPage />} />
            <Route path='/profile' element={<UserProfilePage />} />
            <Route path='/dashboard' element={<Dasboard />} />
            <Route path='/company-dashboard' element={<CompanyDasboard />} />
          </Routes>
        </BrowserRouter>
    </Container>
  )
}

export default App
