import { Autocomplete, Avatar, Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, IconButton, Paper, Stack, Tab, TextField, Tooltip, Typography, styled } from "@mui/material"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import MyAppBar from "../components/MyAppBar"
import { useEffect, useState } from "react"
import Footer, {  } from '../components/Footer'
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from '../redux/profileSlice'
import { fetchUser } from "../redux/userSlice";

const top10skills = [{label: 'Java'}];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  width: '70vw'
}));


const UserProfilePage = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('1')
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthday, setBirthday] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClickEditUserInfor = () => {}
  const handleClickChip = () => {}

  const auth = useSelector((state) => state.auth.auth);
  const user = useSelector((state) => state.user.user);
  const userProfile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(fetchUser(auth.access_token));
  }, [auth.access_token, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = auth.access_token;

    dispatch(createProfile({fullName, phoneNumber, birthday, token}));

    setFullName('');
    setPhoneNumber('');
    setPhoneNumber('');
  }

  return (
    <>
    <MyAppBar/>
    {auth && user && !userProfile && (
      <Box minHeight='700px' maxWidth='70vw' component="form" onSubmit={handleSubmit} noValidate sx={{
        marginLeft: '300px',
        marginTop: '65px',
        boxShadow: 3,
        borderRadius: 2,
        px: 4,
        py: 6,

      }}>
        <Typography variant="h5">Create your simple Profile</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="fullName"
          label="Full Name"
          name="fullName"
          autoComplete="fullName"
          autoFocus
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="phoneNumber"
          label="Phone Number"
          type="phoneNumber"
          id="phoneNumber"
          autoComplete="current-phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="birthday"
          label="Birthday"
          type="birthday"
          id="birthday"
          autoComplete="current-birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    )}
    {auth && user && userProfile && (
    <Box mt='65px' minHeight='700px'>
      <TabContext value={value}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} sx={{ml: 3}}>
            <Tab label='Profile' value='1'/>
            <Tab label='Manage CVs' value='2'/>
            <Tab label='Job Preferences' value='3'/>
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Stack spacing={2} alignItems='center'>
            <Item>
              <Stack spacing={2} direction='column' alignItems='center'>
                {/* <Avatar src={user.avatarUrl} alt={user.name} sx={{ width: 80, height: 80 }} /> */}
                <Avatar src='' alt='' sx={{ width: 80, height: 80 }} />
                <Typography variant='h5' component='h2'>
                  {userProfile.full_name}
                </Typography>
                <Typography variant='body2' component='p'>Email: {user.email}</Typography>
                <Typography variant='body2' component='p'>Phone Number: {userProfile.phone_number} </Typography>
                <Typography variant='body2' component='p'>
                  Date of Birth: {userProfile.date_of_birth}
                </Typography>
                <Typography variant='body2' component='p'>Sex: {userProfile.gender} </Typography>
                <Tooltip title='Edit Profile'>
                  <IconButton onClick={handleClickEditUserInfor} ><BorderColorIcon/></IconButton>
                </Tooltip>
              </Stack>
            </Item>
            <Item>
              <Box display='flex' justifyContent='space-between' margin='10px 10px 10px'>
                <Typography variant="h6">About Me</Typography>
                <Tooltip title='Edit About Me'>
                  <IconButton onClick={handleClickEditUserInfor} ><BorderColorIcon/></IconButton>
                </Tooltip>
              </Box>
              <Typography ml='10px'>About Me value</Typography>
            </Item>
            <Item>
              <Box display='flex' justifyContent='space-between' margin='10px 10px 10px'>
                <Typography variant="h6">Education</Typography>
                <Tooltip title='Edit Education'>
                  <IconButton onClick={handleClickEditUserInfor} ><BorderColorIcon/></IconButton>
                </Tooltip>
              </Box>
              <Typography ml='10px'>Education value</Typography>
            </Item>
            <Item>
              <Box display='flex' justifyContent='space-between' margin='10px 10px 10px'>
                <Typography variant="h6">Work Experience</Typography>
                <Tooltip title='Edit Work Experience'>
                  <IconButton onClick={handleClickEditUserInfor} ><BorderColorIcon/></IconButton>
                </Tooltip>
              </Box>
              <Typography ml='10px'>Work Experience value</Typography>
            </Item>
            <Item>
              <Box display='flex' justifyContent='space-between' margin='10px 10px 10px'>
                <Typography variant="h6">Skill</Typography>
                <Tooltip title='Edit Skill'>
                  <IconButton onClick={handleClickEditUserInfor} ><BorderColorIcon/></IconButton>
                </Tooltip>
              </Box>
              <Typography ml='10px'>Skill value</Typography>
            </Item>
            <Item>
              <Box display='flex' justifyContent='space-between' margin='10px 10px 10px'>
                <Typography variant="h6">Personal Project</Typography>
                <Tooltip title='Edit Personal Project'>
                  <IconButton onClick={handleClickEditUserInfor} ><BorderColorIcon/></IconButton>
                </Tooltip>
              </Box>
              <Typography ml='10px'>Personal Project value</Typography>
            </Item>
            <Item>
              <Box display='flex' justifyContent='space-between' margin='10px 10px 10px'>
                <Typography variant="h6">Certificates</Typography>
                <Tooltip title='Edit Certificates'>
                  <IconButton onClick={handleClickEditUserInfor} ><BorderColorIcon/></IconButton>
                </Tooltip>
              </Box>
              <Typography ml='10px'>Certificates value</Typography>
            </Item>
            <Item>
              <Box display='flex' justifyContent='space-between' margin='10px 10px 10px'>
                <Typography variant="h6">Awards</Typography>
                <Tooltip title='Edit Awards'>
                  <IconButton onClick={handleClickEditUserInfor} ><BorderColorIcon/></IconButton>
                </Tooltip>
              </Box>
              <Typography ml='10px'>Awards value</Typography>
            </Item>
          </Stack>
        </TabPanel>
        <TabPanel value='2'>
          <Stack spacing={2} alignItems='center'>
            <Item>
              <Box display='flex' justifyContent='space-between' margin='10px 10px 10px'>
                <Typography variant="h6">Manage CVs</Typography>
                <Tooltip title='Edit Manage CVs'>
                  <IconButton onClick={handleClickEditUserInfor} ><BorderColorIcon/></IconButton>
                </Tooltip>
              </Box>
              <Typography ml='10px'>Manage CVs value</Typography>
            </Item>
            <Item>
              <Box display='flex' justifyContent='space-between' margin='10px 10px 10px'>
                <Typography variant="h6">Cover Letter</Typography>
                <Tooltip title='Edit Cover Letter'>
                  <IconButton onClick={handleClickEditUserInfor} ><BorderColorIcon/></IconButton>
                </Tooltip>
              </Box>
              <Typography ml='10px'>Cover Letter value</Typography>
            </Item>
          </Stack>
        </TabPanel>
        <TabPanel value='3'>
          <Stack spacing={2} alignItems='center'>
            <Item>
              <Box margin='10px 10px 10px'>
                <Typography variant="h6">My interested job type</Typography>
                <Typography>Let us know the type of job you prefer so we can recommend more suitable opportunities on our site. No emails sent</Typography>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography>Skill</Typography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top10skills}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Skill" />}
                  />
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' mt='10px'>
                  <Typography>Job Level</Typography>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Fresher (0 - 10 months of experience)" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Junior (10 - 36 months of experience)" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Senior (37 - 60 months of experience)" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Manager (> 60 months of experience)" />
                  </FormGroup>
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' mt='10px'>
                  <Typography>Working Type</Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label="At office" variant="outlined" onClick={handleClickChip} />
                    <Chip label="Remote" variant="outlined" onClick={handleClickChip} />
                    <Chip label="Hybrid" variant="outlined" onClick={handleClickChip} />
                  </Stack>
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' mt='10px'>
                  <Typography>Company Type</Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label="IT Product" variant="outlined" onClick={handleClickChip} />
                    <Chip label="IT Outsourcing" variant="outlined" onClick={handleClickChip} />
                    <Chip label="Non-IT" variant="outlined" onClick={handleClickChip} />
                    <Chip label="IT Service and IT Consulting" variant="outlined" onClick={handleClickChip} />
                  </Stack>
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between' mt='10px'>
                  <Typography>Company Size</Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label="1-50" variant="outlined" onClick={handleClickChip} />
                    <Chip label="50-100" variant="outlined" onClick={handleClickChip} />
                    <Chip label="100-200" variant="outlined" onClick={handleClickChip} />
                    <Chip label="200-500" variant="outlined" onClick={handleClickChip} />
                    <Chip label="500+" variant="outlined" onClick={handleClickChip} />
                  </Stack>
                </Box>
                <Button sx={{bgcolor: 'red', color:'white', mt: '20px'}}>Save</Button>
              </Box>
            </Item>
          </Stack>
        </TabPanel>
      </TabContext>
    </Box>
    )}
    <Footer/>
    </>
  )
}

export default UserProfilePage
