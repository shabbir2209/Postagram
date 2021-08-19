import React, {useState} from 'react'
// material ui 
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
// google login
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
// auth actions
import { signin, signup } from '../../actions/auth';

// creating the initial state
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles();
    // this state handles and changes the show password function
    const [showPassword,setShowPassword] = useState(false);
    const [isSignUp,setisSignUp] = useState(false);
    const [formData,setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const history = useHistory();

    // switching between the show password state for showing and hiding the passwords
    const handleShowPassword = () => {
        setShowPassword((prevshowPassword) => !prevshowPassword )
    };

    // handle submit function for the form which dispatches the formdata and the history for redirection
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            dispatch(signup(formData,history))
        }else {
            dispatch(signin(formData,history))
        }
    };

    // setting the form data to the state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});

    };

    // using the signup state,switching between the sign in and sign up methods
    const switchMode = () => {
        setisSignUp((previsSignUp) => !previsSignUp)
        setShowPassword(false)
    };

    // calling the google success if the auth works
    const googleSuccess = async (res) => {
        const result = res ?.profileObj;
        const token = res?.tokenId;

        try{
            dispatch({ type: 'AUTH', data: {result,token}});
            history.push('/')
        }catch (error) {
            console.log(error)
        }
    };

    const googleFailure = () => {
        console.log('Google Sign in Failed')
    };

    // the main return function handles and displays all the auth methods,
    // using the state it checks whether the user has clicked on sign up or sign in and displays the form accordingly,
    // the form also handles a normal user sign in and sign up aswel as the google auth.
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing ={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password" } handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name ="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password" } handleShowPassword={handleShowPassword} />}

                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="890710016837-bq21n1riklfce0n7oar32gnumtogsov3.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="secondary" fullWidth onClick ={renderProps.onClick} disabled={renderProps.disabled} Icon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end" >
                        <Grid item >
                            <Button onClick ={switchMode}>
                                {isSignUp ? 'Already have an account ? Sign In' : 'Dont have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
