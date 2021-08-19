import React, { useState,useEffect } from 'react'
import { Link, BrowserRouter as Router, useHistory, useLocation } from 'react-router-dom';
import { Container, AppBar, Typography, Toolbar, Button, Avatar  } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';

// the main navbar function
const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    // calling the logout action from the dispatch
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        //JWT
        if(token) {
            // this code expires the jwt after the given time when creating the token which requires the users to login again
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    // the main navbar checks if the user is logged in and shows details relative to that.The users name and prof pic from google are displayed and the sign in button changes to the logout when the user is logged in.
    return (
        <>
            <Router>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                <Typography component = {Link} to ="/" className={classes.heading} variant="h2" align="center">Postagram</Typography>
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt ={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick= {logout}>Logout</Button>
                        </div>
                    ): (
                        <Button component = {Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
            </Router>
        </>
    )
}

export default Navbar
