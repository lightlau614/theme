import React, { useState } from 'react';
import { Dialog, DialogContent, DialogContentText, TextField, FormControl, FormLabel } from '@mui/material';
import { CloseButton } from 'react-bootstrap';
import styled from 'styled-components'

//Services
import { validEmail } from '../Services/Regex';
import fetch from '../Services/fetch';

interface Props{
    data: any;
    openTrans: boolean;
    passTrans: Function;
}

const CustomTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
        & fieldset {
            border: 2px solid #7D75FE;
            border-radius: 20px;
        }
    }
`;

const imageAPI = "http://api.theme.com.hk/download/?name="
// const imageAPI = "http://www.api_mongodb.com/download/?name=";
// const imageAPI = 'http://localhost:3000/download/?name='

const TransferBox = ({ data, openTrans, passTrans }:Props) => {

    const [ transopen, setTransOpen ] = useState<boolean>(false);
    const [ controlOpen, setControlOpen ] = useState<number>(0);
    const [ transform, setTransFrom ] = useState<boolean>(false);
    const [ receivemail, setReceiveMail ] = useState<any>('')
    const [ message, setMessage ] = useState<any>('');
    const [ success, setSuccess ] = useState<any>('')

    if(openTrans){
        if(controlOpen === 0){
            setControlOpen(1);
            setTransOpen(true);
        }
    }

    const handleChange = () => {
        setTransFrom(true);
    }

    const handleSumbit = async () => {
        if(validEmail.test(receivemail)){
            if(data){
                const nft = data[0].nft_id;

                if(receivemail){
                    fetch.shareNFT( nft, receivemail)
                    .then((response:any) => {
                        if(response.statusCode === 200){
                            if(response.body.message === 'SUCCESS'){
                                setSuccess('Success sent Art work share to ' + receivemail);
                                setTimeout(()=>{
                                    window.location.reload();
                                },1000);
                            }
                        }
                    });
                }

            }
        }else{
            setMessage('Wrong email! Please enter correct EmailAddress!')
        }
        

    }

    const handleClose = () => {
        passTrans(false);
        setTransOpen(false);
        setTransFrom(false);
        setControlOpen(0)
        setReceiveMail('');
        setSuccess('');
        setMessage('');
    }

    return (
        <>
            <Dialog
                open={transopen}
                onClose={handleClose}
                scroll={'body'}
                PaperProps={{ 
                    style: {
                        borderRadius: 25,
                        position: 'relative',
                        overflow: 'hidden',
                        width: '80%',
                    }
                }}
                >
                <DialogContent>
                    <DialogContentText>
                        <div className='position-relative w-100 mw-100'>
                            <div className='position-absolute w-100'>
                                <div className='fs-6 text-end' role='button' onClick={handleClose}>
                                    <CloseButton onClick={handleClose}/>
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center color-F91B display-5'>
                            <div className='col col-lg-auto text-center'>
                                Send Artwork<br />As Gift
                            </div>
                        </div>
                        
                        {!transform?
                        (
                            <>
                                <div className='fs-6 text-center mt-3 mb-3'>
                                    Send the <b>one-of-a-kind</b> digital art to your friend as a gift!
                                </div>
                                
                                <div className='row d-flex justify-content-center position-relative'>
                                    <div className='w-100 d-flex justify-content-center mb-3'>
                                        {data?Object.values(data).map((item:any, index:any) => {
                                            return(
                                                <>
                                                    <img className='img-fluid' src={imageAPI + item.ImageSrc} />
                                                </>
                                            )
                                        }):''}
                                    </div>
                                </div>
                                <div className='m-auto mt-3 w-75 text-center bg-F91B border-radius-25'>
                                    <div className='mt-2 mb-2 pt-2 pb-2 text-white font-TT'  role='button' onClick={handleChange}>Send Through Email</div>
                                </div>
                            </>
                        ):(
                            <>
                                {!success?(
                                    <>
                                        <div className='fs-6 text-center mt-3 mb-3'>
                                            Type in the receiver's email address.
                                        </div>
                                        <div className='fs-6 text-center mt-3 mb-3'>
                                            {message}
                                        </div>
                                        <div className='row d-flex justify-content-center position-relative'>
                                            <div className='w-100 d-flex justify-content-center mb-3'>
                                                <FormControl fullWidth>
                                                    <FormLabel className='mt-3 mb-2'>Email Address</FormLabel>
                                                    <CustomTextField 
                                                        required
                                                        fullWidth 
                                                        value={ receivemail }
                                                        onChange={ (e:any)=>{setReceiveMail(e.target.value)} }
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className='m-auto mt-3 w-75 text-center bg-F91B border-radius-25'>
                                            <div className='mt-2 mb-2 pt-2 pb-2 text-white font-TT'  role='button' onClick={() => {handleSumbit()}} >Send Through Email</div>
                                        </div>
                                    </>
                                ):(
                                    <>
                                        <div className='fs-6 text-center mt-3 mb-3'>
                                            {success}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TransferBox;