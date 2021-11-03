import React from 'react'

//Components
import PostCard from './PostCard'

//MUI
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

function Profile() {
    return (
        <Container maxWidth="md">
            <Grid align='center' sx={{m:2}}>
                <Avatar sx={{height:120, width:120, mb:-14}}/>
                <Avatar sx={{height:50, width:50, mb:-2, ml:14,bgcolor: 'primary.main'}}>.</Avatar>
                <Paper>
                    <Box sx={{display:'flex', m:2}}/>
                    <Box sx={{mt:10,mb:1 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography variant='overline'>Posts: 10</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='overline' >Followers: 10</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='overline'>Following: 10</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider/>
                    <Box sx={{m:4}}>
                        <Typography sx={{ml:4, mr:4}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </Typography>
                    </Box>
                    <Box sx={{display:'flex', m:2}}/>
                </Paper>
            </Grid>
            <PostCard/>
        </Container>
    )
}

export default Profile
