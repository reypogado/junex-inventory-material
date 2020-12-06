import { Backdrop, Button, CircularProgress, Container, CssBaseline, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Register() {
    var history = useHistory();

    const [fullname, setFullname] = useState("")
    const [position, setPosition] = useState("")
    const [accessType, setAccessType] = useState("")

    const [loading, setLoading] = useState(false)

    const {registerUser} = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        var stat = await registerUser({ fullname: fullname, position: position, accessType: accessType })
        setLoading(false)
        if(stat){
            history.replace('/')
            alert('Registration Successfull, please wait for approval')
        }


    }

    const handleSelectChange = (event) => {
        setAccessType(event.target.value);
    };

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Register
                 </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="code"
                        label="Full Name"
                        onChange={(val) => setFullname(val.target.value)}
                        value={fullname}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="position"
                        label="Position"
                        onChange={(val) => setPosition(val.target.value)}
                        value={position}
                    />
                    <FormControl variant="outlined" className={classes.formControl} fullWidth margin="normal">
                        <InputLabel id="demo-simple-select-outlined-label">Access Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            variant="outlined"
                            required
                            value={accessType}
                            onChange={handleSelectChange}
                            label="Access Type"
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => history.replace('/')}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
            {/* <Box mt={8}> */}
            {/* <Copyright /> */}
            {/* </Box> */}
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default Register
