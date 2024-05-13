import { Box } from "@mui/material"
import MyAppBar from "../components/MyAppBar"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchProfile } from "../redux/profileSlice"

const Dasboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);

  useEffect(() => {
    dispatch(fetchProfile(auth.access_token));
  })

  return (
    <>
    <MyAppBar/>
    <Box mt='65px' minHeight='700px' sx={{
        flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
    }}
    >
    </Box>
    <Footer/>
    </>
  )
}

export default Dasboard
