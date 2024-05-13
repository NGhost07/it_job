import MyAppBar from "../components/MyAppBar"
import BoardBar from "../components/BoardBar";
import Footer from "../components/Footer";
import { Box, Button, Divider, Grid, List, ListItem, Paper, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HomePage = () => {
  const jobsState = useSelector((state) => state.jobs);
  const jobs = jobsState.jobs;

  return (
      <>
      <MyAppBar />
      <BoardBar />
      <Box minHeight='500px' width='100vw' mt={1} pb={2} bgcolor='#e3f2fd'>    
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
                <Button sx={{
                    bgcolor: 'red', 
                    color:'white', 
                    width:'500px',
                    mt: '10px',
                    mb: '10px',
                    "&:hover": {
                      bgcolor: '#3d5afe'
                    }
                    }}
                    >
                      Appy now
                </Button>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
      </>
  )
}

export default HomePage