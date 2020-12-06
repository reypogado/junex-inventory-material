import { Avatar, Backdrop, Box, Button, CircularProgress, Container, CssBaseline, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { UserLogin } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';


function Login() {
    var history = useHistory();

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginStat, setLoginStat] = useState(false);

    // const {loginUser, setUserData } = useContext(AuthContext)

    const { loginUser, user, setUserData } = useContext(AuthContext)

    async function handleSubmit(event) {
        event.preventDefault();
        setLoginStat(false)
        setLoading(true)
        var stat = await loginUser(code)
        setLoginStat(!stat)
        setLoading(false)
        if (stat) {
            history.push('/home')
        }
    }

    useEffect(() => {
        if (code == "") setLoginStat(false)

        var prevData = localStorage.getItem('userData');

        if (prevData) {
            setUserData(prevData)
            history.replace('/home')
        }
    }, [code])

    const classes = useStyles();

    if (!localStorage.getItem('userData'))
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Enter Code
                 </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            error={loginStat}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            name="code"
                            label="Code"
                            id={loginStat ? "outlined-error-helper-text" : ""}
                            onChange={(val) => setCode(val.target.value)}
                            helperText={loginStat ? "Login Failed" : ""}
                            value={code}
                        />
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
                            onClick={()=>{history.push('/register')}}
                            fullWidth
                            variant="contained"
                        >
                            Register
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

    return <div/>
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

export default Login;
