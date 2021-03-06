import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';

import ChangeProf from './Change_prof.js';

import './profile.css';

import Image from './prof_pic.jpg'; // Import using relative path;

export default function Profile() {
    const prof_info = 
        { UserName: 'MikeM' ,Email:"mikeM@sadjoas.sad"};

    const [ Open_change, setOpen_change ] = useState(false);
    const [ Username, setUsername ] = useState(prof_info.UserName);
    const [ Email, setEmail ] = useState(prof_info.Email);

    function handle_show_ch(){
        if (Open_change===true){
            return(
                <ChangeProf
                    handleClose={setOpen_change}
                    Username={Username}
                    Email={Email}
                    changeEmail={setEmail}
                    changeUsername={setUsername}
                ></ChangeProf>
            )
        } 
    }

    return(
        <div className="text-white">
            <Grid container>
                <Grid item xs={12} sm={2}></Grid>
                <Grid item xs={12} sm={8} align="center">
                <img className= "prof_image" alt="Standard profile pic" src={Image} />
                    <List>
                        <ListItemText  primary={
                            <React.Fragment>
                            <Typography variant="body1">
                                Username: {Username}
                            </Typography>
                            </React.Fragment>
                        }/>
                        <ListItemText  primary={
                            <React.Fragment>
                            <Typography variant="body1">
                               Email:{Email}
                            </Typography>
                            </React.Fragment>
                        }/>
                    </List>

                </Grid>
                <Grid item xs={12} sm={2} align="center">
                    <Button
                    startIcon={<SettingsIcon /> } onClick={()=>{setOpen_change(true)}} color="inherit">Profile Settings</Button>
                </Grid>
            </Grid>
            {handle_show_ch()}
        </div>
    )
};
