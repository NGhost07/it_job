import { Box, Divider, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"

const CreateJob = () => {
  return (
    <>
    <Box
    width={1200}
    sx={{
        boxShadow: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        pt: '20px',
        pb: '20px',
        marginLeft: 40,
    }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6" marginLeft="30px">Title *</Typography>
            <TextField 
               sx={{
                width:'900px',
                mr: '30px'
               }}
            />
        </Box>
        <Divider sx={{mt:'10px', mb: '10px'}} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6" marginLeft="30px">Description *</Typography>
            <TextField 
               sx={{
                width:'900px',
                mr: '30px'
               }}
            />
        </Box>
        <Divider sx={{mt:'10px', mb: '10px'}} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6" marginLeft="30px">Requirements *</Typography>
            <TextField 
               sx={{
                width:'900px',
                mr: '30px'
               }}
            />
        </Box>
        <Divider sx={{mt:'10px', mb: '10px'}} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6" marginLeft="30px">Benefits *</Typography>
            <TextField 
               sx={{
                width:'900px',
                mr: '30px'
               }}
            />
        </Box>
        <Divider sx={{mt:'10px', mb: '10px'}} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6" marginLeft="30px">Job Levels *</Typography>
            <FormControl>
                <RadioGroup row sx={{ mr: '20px'}}>
                    <FormControlLabel value="FRESHER" control={<Radio />} label="Fresher" />
                    <FormControlLabel value="JUNIOR" control={<Radio />} label="Junior" />
                    <FormControlLabel value="SENIOR" control={<Radio />} label="Senior" />
                    <FormControlLabel value="MANAGER" control={<Radio />} label="Manager" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Divider sx={{mt:'10px', mb: '10px'}} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6" marginLeft="30px">Salary Min *</Typography>
            <TextField 
               sx={{
                width:'900px',
                mr: '30px'
               }}
            />
        </Box>
        <Divider sx={{mt:'10px', mb: '10px'}} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6" marginLeft="30px">Salary Max *</Typography>
            <TextField 
               sx={{
                width:'900px',
                mr: '30px'
               }}
            />
        </Box>
        <Divider sx={{mt:'10px', mb: '10px'}} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6" marginLeft="30px">Working Type *</Typography>
            <FormControl>
                <RadioGroup row sx={{ mr: '20px'}}>
                    <FormControlLabel value="AT_OFFICE" control={<Radio />} label="At Office" />
                    <FormControlLabel value="REMOTE" control={<Radio />} label="Remote" />
                    <FormControlLabel value="HYBRID" control={<Radio />} label="Hybrid" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Divider sx={{mt:'10px', mb: '10px'}} />
    </Box>
    </>
  )
}

export default CreateJob

                // value={email}
                // onChange={(e) => setEmail(e.target.value)}AT_OFFICE
