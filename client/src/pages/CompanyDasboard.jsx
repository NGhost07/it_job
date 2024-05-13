import { Box, Button, Divider, Grid, List, ListItem, Paper, Tab, Typography, styled } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import MyAppBar from '../components/MyAppBar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import CreateJob from '../components/CreateJob';
import { getJobsByCompanyInforId } from '../redux/jobsSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CompanyDasboard = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('1')

  const jobs = useSelector((state) => state.jobs.jobs);
  const company = useSelector((state) => state.company.company);

  const handleChange = (event, newValue) => {setValue(newValue)}

  useEffect(() => {
    dispatch(getJobsByCompanyInforId(company?.companyInfor_id))
  }, [company, dispatch])

  return (
    <>
    <MyAppBar/>
    <Box mt='72px' pb={2} minHeight='700px'>
      <TabContext value={value}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} sx={{ml: 3}}>
            <Tab label='All Jobs' value='1'/>
            <Tab label='Create new job' value='2'/>
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Box pb={2} bgcolor='#e3f2fd'>
            <Grid container pl={10} pr={10} spacing={3}>
              {jobs && jobs.map((job) => (
                <Grid key={job.job_id} item xs={6}>
                  <Item>
                    <Typography variant="h5" fontWeight="bold">{job.title}</Typography>
                    <List sx={{
                      py: 0,
                      width: '100%',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      backgroundColor: 'background.paper',
                    }}>
                      <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Typography variant="h6">Description: </Typography>
                        <Typography>{job.description}</Typography>
                      </ListItem>
                      <Divider />
                      <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Typography variant="h6">Requirements: </Typography>
                        <Typography>{job.requirements}</Typography>
                      </ListItem>
                      <Divider />
                      <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Typography variant="h6">Benefits: </Typography>
                        <Typography>{job.benefits}</Typography>
                      </ListItem>
                      <Divider />
                      <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Typography variant="h6">JobLevels: </Typography>
                        <Typography>{job.jobLevels}</Typography>
                      </ListItem>
                      <Divider />
                      <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Typography variant="h6">Salary: </Typography>
                        <Typography>{job.salary_min}$ - {job.salary_max}$ Per Month </Typography>
                      </ListItem>
                      <Divider />
                      <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Typography variant="h6">Working Type: </Typography>
                        <Typography>{job.working_type}</Typography>
                      </ListItem>
                      <Divider />
                    </List>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                      <Button sx={{
                        bgcolor: '#2196f3', 
                        color:'white', 
                        width:'200px',
                        mt: '10px',
                        mb: '10px',
                        "&:hover": {
                          bgcolor: '#3d5afe'
                        }
                        }}
                        >
                          Update
                      </Button>
                      <Button sx={{
                        bgcolor: 'red', 
                        color:'white', 
                        width:'200px',
                        mt: '10px',
                        mb: '10px',
                        "&:hover": {
                          bgcolor: '#3d5afe'
                        }
                        }}
                        >
                          Delete
                      </Button>
                    </Box>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value='2'>
          <CreateJob/>
        </TabPanel>
      </TabContext>
    </Box>
    <Footer/>
    </>
  )
}

export default CompanyDasboard
