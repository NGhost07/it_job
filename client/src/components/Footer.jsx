import { Box, Button, Container, Grid, IconButton, Link, Typography } from "@mui/material"
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from "react-router-dom";

const socialMediaLinks = {
    facebook: '#',
    twitter: '#',
    instagram: '#',
};

const Footer = () => {
    const navigate = useNavigate()
    const handleClickLogo = () => {
        navigate('/')
    }

  return (
    <Box
      placement="bottom-end"
      sx={{
        bottom: 0,
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        width: '100vw',
        bgcolor: 'rgb(33,5,5)',
        color: 'white'
      }}
    >
      <Container maxWidth={false} color="inherit">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Button
                color='inherit' 
                sx={{ bgcolor: 'red', 
                padding: '10px 30px 10px' }}
                onClick={handleClickLogo}
            >
                <ScreenSearchDesktopIcon />
                <Typography pl={1}>IT-JOB</Typography>
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="inherit" gutterBottom fontSize='1.3rem' fontWeight='bold'>
                About Us
            </Typography>
            <Link href="#" color="inherit" display="block" underline='hover'>Home</Link>
            <Link href="#" color="inherit" display="block" underline='hover'>About Us</Link>
            <Link href="#" color="inherit" display="block" underline='hover'>AI Match Service</Link>
            <Link href="#" color="inherit" display="block" underline='hover'>FAQ</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="inherit" gutterBottom fontSize='1.3rem' fontWeight='bold'>
                Campaign
            </Typography>
            <Link href="#" color="inherit" display="block" underline='hover'>IT Story</Link>
            <Link href="#" color="inherit" display="block" underline='hover'>Writing Contest</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="inherit" gutterBottom fontSize='1.3rem' fontWeight='bold'>
                Terms & Conditions
            </Typography>
            <Link href="#" color="inherit" display="block" underline='hover'>Privacy Policy</Link>
            <Link href="#" color="inherit" display="block" underline='hover'>Operating Regulation</Link>
            <Link href="#" color="inherit" display="block" underline='hover'>Complaint Handling</Link>
            <Link href="#" color="inherit" display="block" underline='hover'>Terms & Conditions</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="inherit" gutterBottom fontSize='1.3rem' fontWeight='bold'>
              Social media
            </Typography>
            <IconButton aria-label="Facebook" color="inherit" component="a" href={socialMediaLinks.facebook}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit" component="a" href={socialMediaLinks.twitter}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit" component="a" href={socialMediaLinks.instagram}>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="inhenrit" align="center" sx={{ pt: 4 }}>
          © 2024 Company Co. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
