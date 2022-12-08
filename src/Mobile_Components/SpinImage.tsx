import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogContentText } from '@mui/material';
import { CloseButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import fetch from '../Services/fetch';

interface Props{
    openDraw: boolean;
    passDraw: Function;
    drawImage: string;
}

const imageAPI = "http://api.theme.com.hk/download/?name="
// const imageAPI = "http://www.api_mongodb.com/download/?name=";
// const imageAPI = 'http://localhost:3000/download/?name='

const SpinImage = ( { openDraw, passDraw, drawImage }:Props ) => {
    const [spinValue, setSpinValue] = useState<any>(0);
    const [count, setCount] = useState<number>(0);

    const [ drawOpen, setDrawOpen] = useState<boolean>(false);
    const [ controlOpen, setControlOpen ] = useState<number>(0);
    const [ showImage, setShowImage ] = useState<boolean>(false);
    const [ displayImg, setDisplayImg ] = useState<any>(''); 
    const [ haveOrder, setHaveOrder ] = useState<boolean>(false);

    const navigate = useNavigate();

    const handelClick = () => {
        setCount(count+1);
        setSpinValue(5);
    }

    if(openDraw){
        if(controlOpen === 0){
            setControlOpen(1);
            setDrawOpen(true);
            setShowImage(false);
        }
    }

    const handleClose = () => {
        setControlOpen(0);
        setSpinValue(0);
        setCount(0);
        passDraw(false);
        setShowImage(false);
        setDrawOpen(false);
    }

    const handleMake = () =>{
        let nft_id = drawImage.split('.');
        navigate('/product/Hoodie/' + nft_id[0]);
    }

    useEffect(()=>{
        if (count < 738 && count !== 0){
            setTimeout(()=>{
                setSpinValue(spinValue+10);
                setCount(count+1)
            },10)
        }
        if (count >= 369){
            setDisplayImg(imageAPI + drawImage);
            fetch.fetchOrder(drawImage).then(
                (response:any) =>{
                    if(response.body.data.Order !== null){
                        setHaveOrder(true);
                    }else{
                        if(response.body.data.DisableOrder === 1){
                            setHaveOrder(true);
                        }
                    }
                }
            )
            setShowImage(true);
        }
        
    },[spinValue])

    useEffect(()=>{
        if(controlOpen === 1){
            setSpinValue(5);
            setCount(count+1);
        }
    },[controlOpen]);

    return (
        <>
            <Dialog
                open={drawOpen}
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
                            <div className='col col-lg-auto'>
                                Redeem Token
                            </div>
                        </div>
                        <div className='fs-6 text-center mt-3'>
                        {showImage?
                            (
                                <>
                                    Say <b>Hello</b> to your exclusive generative art!
                                </>
                            )
                            :    
                            (
                                <>
                                    Be Patient...Your <b>one-of-a-kind</b> digital art will be ready in few seconds.........
                                </>
                            )
                        }
                        </div>
                        <div className='row d-flex justify-content-center position-relative'>
                            <div className='w-100 d-flex justify-content-center'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/drawbox_bg.png')} />
                            </div>
                            <div className='w-75 top-50 start-50 position-absolute translate-middle p-3'>
                                <img src={require('../Resources/Asset/images/Card_logo.png')} style={{transform: 'rotateY('+spinValue+'deg)'}} className={`${showImage? 'display-none': ''} img-fluid`} onClick={handelClick} />
                                <img src={displayImg} className={`${showImage ? "" : 'display-none'} img-fluid`}/>
                            </div>
                        </div>
                        {showImage? 
                            (
                                <>
                                    {!haveOrder?(
                                        <>
                                            <div className='row d-flex justify-content-center'>
                                                <div className='col-12 col-sm-4 m-1 text-center bg-F91B border-radius-25'>
                                                    <div className='mt-2 mb-2 lh-3 text-white font-TT'  role='button' onClick={handleMake}>Cus<span>t</span>omise Hoodie</div>
                                                </div>
                                                <div className='col-12 col-sm-4 m-1 text-center bg-7DFE border-radius-25'>
                                                    <div className='mt-2 mb-2 lh-3 text-white font-TT'  role='button' onClick={()=>{ window.location.href = '/me'}}>See My Profile</div>
                                                </div>
                                            </div>
                                        </>
                                    ):(
                                        <>
                                            <div className='row d-flex justify-content-center'>
                                                <div className='col-12 col-sm-4 m-1 text-center bg-9390 border-radius-25'>
                                                    <div className='mt-2 mb-2 lh-3 text-white font-TT'  role='button' >Cus<span>t</span>omised Hoodie</div>
                                                </div>
                                                <div className='col-12 col-sm-4 m-1 text-center bg-7DFE border-radius-25'>
                                                    <div className='mt-2 mb-2 lh-3 text-white font-TT'  role='button' onClick={()=>{ window.location.href = '/me'}}>See My Profile</div>
                                                </div>
                                            </div>
                                        </> 
                                    )}
                                </>
                            )
                        :
                            (
                                <>
                                    <div className='row d-flex justify-content-center position-relative mt-3 mb-3'>
                                        <div className='w-25 d-flex justify-content-center'>
                                            <img className='w-30 img-fluid' src={require('../Resources/Asset/images/Image_loading.png')} />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SpinImage;