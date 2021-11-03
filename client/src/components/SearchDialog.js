import {React, useState, Fragment} from 'react'
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//Icons
import SearchIcon from '@mui/icons-material/Search';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function SearchDialog() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, marginLeft:4, marginRight:10, borderRadius:10 }}>
            <Fragment>
                <CardActionArea 
                    onClick={handleOpen}
                    sx={{
                        display:'flex',
                       
                        width:'100%'
                    }}
                >
                <Card
                        sx={{
                            display:'flex',
                            backgroundColor:'#e1f5fe',
                            padding:'8px',
                           
                            width:'100%'
                        }}
                    > 
                            <SearchIcon />
                            <Typography variant='body1' sx={{marginLeft:'10px'}}>{' '}Search </Typography>
                        
                    </Card>
                </CardActionArea>
            </Fragment>
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md" >
                <DialogContent sx={{height:'55vh'}}>
                    <TextField id="searchfield" label="Search" variant="outlined" fullWidth/>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Users" {...a11yProps(0)}/>
                            <Tab label="Topics"  {...a11yProps(1)}/>
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Typography>Users Result</Typography>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Typography>Topics Result</Typography>
                    </TabPanel>
                    
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default SearchDialog
