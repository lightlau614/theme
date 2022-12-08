import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, 
    InputLabel, Select, MenuItem, FormHelperText, TextField, FormControl, IconButton } from '@mui/material';
import fetch from '../Services/fetch';

//Icon import
import { Navigate, useNavigate } from 'react-router-dom';
import { CloseButton } from 'react-bootstrap';

interface Props{
    openToken: boolean;
    passToken:Function;
    passDraw: Function;
}

const TokenBox = ( { openToken, passToken, passDraw }:Props) =>{

    const [tokenOpen, setTokenOpen] = useState<boolean>(false);

    const [ count , setCount ] = useState<number>(0);
    
    const [ message, setMessage ] = useState<any>('');

    const [ token, setToken ] = useState<any>('');

    //Validation
    const [ userError, setUserError ] = useState<boolean>(false);

    let navigate = useNavigate();

    const descriptionElementRef = useRef<HTMLElement>(null);

    if(openToken){
        if(count === 0){
            setCount(1);
            setTokenOpen(true);
        }
    }

    useEffect(()=>{
        if(tokenOpen){
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    },[tokenOpen]);

    const handleClose = () => {
        setCount(0);
        setTokenOpen(false);
        setToken('');
        passToken(false);
        setMessage('');
    }

    const submit = async (e:any) => {
        fetch.checktokenexchange(token)
            .then((response:any) => {
                if(response.statusCode === 200){
                    setCount(0);
                    setTokenOpen(false);
                    setToken('');
                    

                    if(response.body.data.User_id === null){
                        fetch.registerToken(token).then((response_token:any)=>{
                            if(response_token.statusCode === 200){
                                fetch.registerNFT(response.body.data.nft_id);
                                passDraw([{'open': true, 'img': response.body.data.ImageSrc}]);
                            }
                        });
                    }else{
                        setMessage('This Token had Registered')
                    }
                    
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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        submit(token);
    }

    return (
        <>
            <Dialog
                open={tokenOpen}
                onClose={handleClose}
                maxWidth={'xl'}
                scroll={'body'}
                PaperProps={{ 
                    style: {
                        borderRadius: 25,
                        position: 'relative',
                        overflow: 'hidden'
                    }
                }}
            >
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <div className='position-relative w-100 mw-100 h-100 mh-100 p-1'>
                            <div className='position-relative '>
                                <div className='position-absolute w-100'>
                                    <div className='text-end' >
                                        <CloseButton onClick={handleClose} />
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div className='row d-flex justify-content-center color-F91B display-5'>
                                    <div className='col col-lg-auto font-TT'>
                                        Redeem Token
                                    </div>
                                </div>
                                <div className='text-center fs-5 position-relative h-100 mt-4'>
                                    <div className='mb-4 font-TT'>
                                        Token code has been sent to your email. <br />
                                        Please check and type in the code below to redeem your one and only digital art!
                                    </div>
                                    
                                    
                                </div>

                            </div>

                            <div className='position-relative mt-3'>
                                <div className='p-3 bg-7DFE m-auto' style={{borderRadius: 25}}>
                                    <div className='mt-1 mb-4 font-24 text-white text-center'>
                                        TYPE IN TOKEN CODE
                                    </div>
                                    <div className='w-100 mb-2'>
                                        <div className='w-100 m-auto bg-FFF border-radius-25'>
                                            <FormControl fullWidth>
                                                <TextField
                                                    className='m-auto'
                                                    error={ userError===true }
                                                    sx={{
                                                        width: {sm: 260, md: 260},
                                                        "& input": {
                                                            textAlign: "center"
                                                        }
                                                    }}
                                                    value={token}
                                                    variant="standard"
                                                    InputProps={{
                                                            disableUnderline: true
                                                        }
                                                    }
                                                    onChange={(e) => {
                                                            setToken(e.target.value)
                                                        }
                                                    }
                                                />
                                            </FormControl>
                                        </div>
                                        <div className='mt-3 text-white'>{message}</div>
                                    </div>
                                    
                                </div>
                                <div className='w-100 d-flex justify-content-start position-relative '>
                                    <div className='w-25 position-absolute' style={{top: '-25px', left: '-5%'}}>
                                        <img className='img-fluid' src={require('../Resources/Asset/images/Image_money.png')} />
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div className='mt-5 text-center bg-F91B border-radius-25'>
                                    <div className='mt-2 mb-2 lh-3 text-white font-TT' role={'button'} onClick={handleSubmit}>Redeem</div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default TokenBox;