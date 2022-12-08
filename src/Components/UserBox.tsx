import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, 
    TextField, FormControl, IconButton, Box, Tabs, Tab, FormLabel, FormControlLabel, Checkbox
} from '@mui/material';
import styled from 'styled-components'

//Service
import { validUser } from '../Services/Regex';

//Icon import
import { BsCheckSquare, BsSquare } from 'react-icons/bs';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import AuthService from '../Services/auth.service';
import fetch from '../Services/fetch';
import { CloseButton, FormGroup } from 'react-bootstrap';

const API_URL = "http://www.api_mongodb.com/";

interface Props{
    openLogin: boolean;
    passLogin: Function;
    getForget: string;
}

interface State{
    id: string,
    firstname: string,
    lastname:string,
    password: string,
    email:string,
    showPassword: boolean,
    passwordReEnter: string,
    subscibed: boolean
}

const CustomTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
        & fieldset {
            border: 2px solid #7D75FE;
            border-radius: 20px;
        }
    }
`;


const UserBox = ( { openLogin, passLogin, getForget }:Props) =>{

    const params = useParams();

    const [ userOpen, setUserOpen ] = useState<boolean>(false);
    const [ count , setCount ] = useState<number>(0);
    const [ change, setChange ] = useState<string>('false');
    const [ forget, setForget ] = useState<boolean>(false);
    const [ values, setValues ] = useState<State>({
        id:'',
        firstname: '',
        lastname:'',
        password: '',
        email:'',
        showPassword: false,
        passwordReEnter: '',
        subscibed: true
    });

    const [ message, setMessage ] = useState<any>('');
    const [ finalMessage, setFinalMessage ] = useState<any>('');
    const [ successMessage, setSuccessMessage ] = useState<any>('');

    //Validation
    const [ userError, setUserError ] = useState<boolean>(false);
    const [ passError, setPassError ] = useState<boolean>(false);

    let navigate = useNavigate();

    const descriptionElementRef = useRef<HTMLElement>(null);

    if(openLogin){
        if(count === 0){
            setCount(1);
            setUserOpen(true);
        }
    }

    useEffect(()=>{
        if(userOpen){
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    },[userOpen]);

    // useEffect( () => {
    //     // fetch();
    // },[]);

    const handleForget = () => {
        setForget(true);
    }

    const handleSwitchLogin = (event: React.SyntheticEvent, newValue: string) => {
        setValues({
            id:'',
            firstname: '',
            lastname:'',
            password: '',
            email:'',
            showPassword: false,
            passwordReEnter: '',
            subscibed: true
        });
        setMessage('');

        setChange(newValue);
        setForget(false);
        
    }

    const handleSubmit = async(e:any) => {
        if (forget){
            if (values.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
                let req = {
                    email: values.email
                }
                fetch.sendForget(req);
                setFinalMessage(`Resetting email sent to ${req.email}, please check your mail box.`);
                setTimeout(()=>{
                    window.location.reload();
                },5000)
            }
            else{
                setMessage("ERROR: Please input a valid email.");
            }
        }
        else if (getForget){
            if (values.password!==values.passwordReEnter){
                setMessage("Re-entered Password not match.");
            }
            else{
                let req = {
                    token: params.token,
                    password: values.password
                }
                fetch.resetPassword(req).then((result)=>{
                    if (result.data.body.message === 'SUCCESS'){
                        setMessage("Password Reseted!");
                        setTimeout(()=>{
                            window.location.href = '/collection';
                        },5000)
                        setValues({...values, password: '', passwordReEnter: ''})
                    }
                    else{
                        setMessage("Request Failed! Please retry.")
                    }
                })
                
            }
        }
        else if(change === 'false'){
            AuthService.login(values.email, values.password).then(
                (response:any) => {
                    if(response.statusCode === 200){
                        // navigate("/");
                        if (params.TransferToken){
                            window.location.reload();
                        }
                        else{
                            setTimeout(()=>{
                                window.location.replace('/collection');
                            },1000)
                        }
                        setUserOpen(false);
                    }else if (response.statusCode === 401){
                        setMessage(response.body.message);
                    }
                },
                (error:any) => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString;
                    setMessage(resMessage);
                }
            );
        }
        
        else{
            if (values.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){

                if(values.firstname !== null && values.lastname !== null && values.password !== null){
                    AuthService.register(values).then(
                        (response:any) => {
                            if(response.statusCode === 200){
                                // navigate("/");
                                setSuccessMessage('To finish the registration, please check your email for confirmation.')
                                setTimeout(()=>{
                                    window.location.reload();
                                    setUserOpen(false);
                                },5000)
                            }else if (response.statusCode === 400){
                                setMessage(response.body.data.message);
                            }
                        },
                        (error:any) => {
                            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString;
                            setMessage(resMessage);
                        }
                    );
                }else{
                    setMessage('Please Enter All Information of Register Form.');
                }
            
            }else{
                setMessage('Please Enter All Information of Register Form.');
            }

            
        }
    }

    const handleClose = () => {
        setUserOpen(false);
        setCount(0);
        setChange('false');
        passLogin(false);
        setValues({
            id:'',
            firstname: '',
            lastname:'',
            password: '',
            email:'',
            showPassword: false,
            passwordReEnter: '',
            subscibed: true
        });
        setForget(false);
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    }

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) =>{
        if(prop === 'subscibed'){
            setValues({...values, [prop]: event.target.checked});
        }else{
            setValues({...values, [prop]: event.target.value});
        }
    }

    return (
        <>
            <Dialog
                open={userOpen}
                onClose={handleClose}
                // maxWidth={'xl'}
                PaperProps={{ 
                    style: {
                        borderRadius: 25,
                        // height: '60%',
                        // width: '60%',
                        position: 'relative',
                        overflow: 'hidden'
                    }
                }}
            >
                <form>
                    
                    <DialogContent>
                        <DialogContentText>
                            <div className='row position-relative'>
                                <div className='col font-48 color-F91B text-center'>
                                    {successMessage !== ''?
                                    (
                                    <>
                                        Please check your email instead?
                                    </>
                                    ):(
                                    <>
                                        {!getForget?(!forget?(<>Hi There!</>):(<>Forget your Password!</>)):(<>Reset Password</>)}
                                    </>
                                    )}
                                </div>
                                <div className='position-absolute text-end'>
                                    <CloseButton onClick={handleClose} />
                                    {/* <Button onClick={handleClose}><span className='font-24'>X</span></Button> */}
                                </div>
                            </div>
                            {successMessage !== ''?
                            (
                            <>
                                <div>
                                    {successMessage}
                                </div>
                            </>
                            ):(
                                <>
                            {finalMessage !== ''?
                            (
                                <div>
                                    {finalMessage}
                                </div>
                            )
                            :
                            (
                                <>
                                    {!getForget?(
                                        <>
                                            {/* <Button onClick={handleSwitchLogin} value="login" >LOGIN</Button>
                                            <Button onClick={handleSwitchLogin} value="register" >I'M NEW HERE</Button>
                                            <Divider color="#c9c9c9"/> */}
                                            
                                            {!forget?(
                                                <>
                                                    <Box className='mb-3' sx={{ width: '100%' , borderBottom: 1, borderColor: 'divider'}}>
                                                        <Tabs value={change} onChange={handleSwitchLogin} aria-label="wrapped label tabs example" 
                                                        indicatorColor="primary">
                                                            <Tab value={'false'} label="Login" />
                                                            <Tab value={'true'} label="I'M NEW HERE" />
                                                        </Tabs>
                                                    </Box>
                                                </>
                                            ):(
                                                <div>
                                                    Enter your email address and we'll send you a link to reset your password.
                                                </div>   
                                            )}
                                            
                                        </>
                                    ):''}
                                
                                <div>{message}</div>
                                {!getForget?(
                                    <>
                                    {!forget?(
                                        <>
                                            {change === 'true'?
                                                (
                                                    <>
                                                    {/* Register */ }
                                                        <FormControl fullWidth>
                                                            <div className='row d-flex justify-content-center m-auto'>
                                                                {/* <div className='row d-flex justify-content-center m-auto'> */}
                                                                <div className='col col-lg-6 mt-2 mb-2'>
                                                                    <div>
                                                                    <FormLabel>First Name</FormLabel>
                                                                    </div>
                                                                    <div>
                                                                    <CustomTextField 
                                                                        required
                                                                        error={userError===true}
                                                                        value={ values.firstname }
                                                                        fullWidth
                                                                        onChange={handleChange('firstname')}
                                                                    />
                                                                    </div>
                                                                </div>
                                                                <div className='col col-lg-6 mt-2 mb-2'>
                                                                    <div>
                                                                    <FormLabel>Email Address</FormLabel>
                                                                    </div>
                                                                    <div>
                                                                    <CustomTextField 
                                                                        required
                                                                        error={userError===true}
                                                                        fullWidth
                                                                        value={ values.email }
                                                                        helperText={userError===true?"Please enter Your Email!":""}
                                                                        onChange={handleChange('email')}
                                                                    />
                                                                    </div>
                                                                </div>
                                                            
                                                                <div className='col col-lg-6 mt-2 mb-2'>
                                                                    <div>
                                                                    <FormLabel>Last Name</FormLabel>
                                                                    </div>
                                                                    <div>
                                                                    <CustomTextField 
                                                                        required
                                                                        error={userError===true}
                                                                        fullWidth
                                                                        value={ values.lastname }
                                                                        onChange={handleChange('lastname')}
                                                                    />
                                                                    </div>
                                                                </div>
                                                                <div className='col col-lg-6 mt-2 mb-2'>
                                                                    <div>
                                                                    <FormLabel>Password</FormLabel>
                                                                    </div>
                                                                    <div>
                                                                    <CustomTextField
                                                                        required
                                                                        error={passError===true}
                                                                        fullWidth
                                                                        type={values.showPassword? 'text' : 'password' }
                                                                        value={ values.password }
                                                                        onChange={handleChange('password')}
                                                                        InputProps={{
                                                                            endAdornment: (
                                                                                <IconButton
                                                                                    aria-label='toggle password visibility'
                                                                                    onClick={handleClickShowPassword}
                                                                                    edge="end"
                                                                                >
                                                                                    {values.showPassword? <VisibilityOff />: <Visibility />}
                                                                                </IconButton>
                                                                            )
                                                                        }}
                                                                    />
                                                                    </div>
                                                                </div>
                                                                <div className='col col-lg-12 mt-2 mb-2'>
                                                                        <FormGroup>
                                                                            <FormControlLabel control={
                                                                                <Checkbox 
                                                                                    defaultChecked
                                                                                    checkedIcon={<BsCheckSquare />} 
                                                                                    icon={<BsSquare />}
                                                                                    onChange={handleChange('subscibed')}
                                                                                />} label='Sign up to receive newsletters and latest promotion.' />
                                                                        </FormGroup>
                                                                </div>
                                                                {/* </div> */}
                                                            </div>
                                                        </FormControl>
                                                    </>
                                                ):(
                                                    <>
                                                    {/* Login */ }
                                                        <FormControl fullWidth>
                                                            <FormLabel>Email Address</FormLabel>
                                                            <CustomTextField
                                                                error={userError===true}
                                                                fullWidth
                                                                className='mt-1 mb-1'
                                                                value={ values.email || ""}
                                                                onChange={handleChange('email')} 
                                                                helperText={userError===true?"Please enter Your Email!":""}
                                                                />
                                                                
                                                        </FormControl>
                                                        <FormControl fullWidth>
                                                            <FormLabel>Password</FormLabel>
                                                            <CustomTextField
                                                                error={passError===true}
                                                                type={values.showPassword? 'text' : 'password' }
                                                                value={ values.password }
                                                                className='mt-1 mb-1'
                                                                // helperText={"Enter your password"}
                                                                onChange={handleChange('password')}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <IconButton
                                                                            aria-label='toggle password visibility'
                                                                            onClick={handleClickShowPassword}
                                                                            edge="end"
                                                                        >
                                                                            {values.showPassword? <VisibilityOff />: <Visibility />}
                                                                        </IconButton>
                                                                    )
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </>
                                                )
                                            }
                                        </>
                                    ):(
                                        <>
                                        {/* Forget */ }
                                            <FormControl fullWidth>
                                                {/* <TextField 
                                                    error={userError===true}
                                                    fullWidth label="Email"
                                                    name="email"
                                                    value={ values.email }
                                                    variant="standard"
                                                    helperText={userError===true?"Please enter Your Email!":"Enter your email address"}
                                                    onChange={handleChange('email')}
                                                /> */}
                                                <FormLabel className='mt-3 mb-2'>Email Address</FormLabel>
                                                <CustomTextField 
                                                    required
                                                    error={userError===true}
                                                    fullWidth 
                                                    
                                                    value={ values.email }
                                                    
                                                    
                                                    onChange={handleChange('email')}
                                                />
                                            </FormControl>
                                        </>
                                    )}
                                </>
                                ):(
                                    <>
                                    {/* Reset */ }
                                        <FormControl fullWidth>
                                        <FormLabel>New Password</FormLabel>
                                            <CustomTextField
                                                error={passError===true}
                                                fullWidth 
                                                type={values.showPassword? 'text' : 'password' }
                                                value={ values.password }
                                                
                                                helperText={"Enter your new password"}
                                                onChange={handleChange('password')}
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton
                                                            aria-label='toggle password visibility'
                                                            onClick={handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword? <VisibilityOff />: <Visibility />}
                                                        </IconButton>
                                                    )
                                                }}
                                            />
                                            <FormLabel>Re-enter Password</FormLabel>
                                            <CustomTextField
                                                error={values.password!==values.passwordReEnter?true:false}
                                                fullWidth 
                                                type={values.showPassword? 'text' : 'password' }
                                                value={ values.passwordReEnter }
                                                
                                                helperText={values.password!==values.passwordReEnter?"Re-enter your New password":""}
                                                onChange={handleChange('passwordReEnter')}
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton
                                                            aria-label='toggle password visibility'
                                                            onClick={handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword? <VisibilityOff />: <Visibility />}
                                                        </IconButton>
                                                    )
                                                }}
                                            />
                                        </FormControl>
                                    </>
                                )}
                                <div className='row d-flex justify-content-center text-center text-white mt-3'>
                                    
                                    {!getForget?(
                                        <>
                                        {!forget?(
                                            <>
                                                {change !== 'true'?(
                                                <>
                                                    <div className='col col-sm-5 bg-F91B border-radius-25 lh-3 me-2' role={'button'} onClick={handleSubmit}>Login</div>
                                                    <div className='col col-sm-5 bg-7DFE border-radius-25 lh-3 ms-2' role={'button'} onClick={handleForget}>Forget Password</div>
                                                </>
                                                ):(
                                                    <>
                                                        <div className='col col-sm-5 bg-F91B border-radius-25 lh-3 me-2' role={'button'} onClick={handleSubmit}>Join Us</div>
                                                    </>
                                                )}
                                            </>
                                        ):(
                                            <>
                                                <div className='col col-sm-5 bg-F91B border-radius-25 lh-3 me-2' role={'button'} onClick={handleSubmit}>Reset Password</div>
                                                <div className='col col-sm-5 bg-7DFE border-radius-25 lh-3 ms-2' role={'button'} onClick={()=>{setForget(false); setChange('false')}}>Back to Sign In</div>
                                            </>
                                        )}
                                        </>
                                    ):(
                                        <>
                                            <div className='col col-sm-5 bg-F91B border-radius-25 lh-3 me-2' role={'button'} onClick={handleSubmit}>Confirm</div>
                                            <div className='col col-sm-5 bg-7DFE border-radius-25 lh-3 ms-2' role={'button'} onClick={()=>{setForget(false); setChange('false')}}>Back to Sign In</div>
                                        </>
                                    )}
                                </div>
                                </>
                            )}</>)}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* {!getForget?(
                            <>
                            {!forget?(
                                <>
                                    
                                    <Button onClick={handleForget}>Forget Password</Button>
                                </>
                            ):''}
                            </>
                        ):''} */}
                        {/* <Button onClick={handleClose}>Close</Button> */}
                        {/* <Button onClick={handleSubmit}>Confirm</Button> */}
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default UserBox;