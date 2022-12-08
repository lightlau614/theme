import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Button, Paper, Typography } from '@mui/material';

import fetch from '../Services/fetch';

interface Props{
    openOrder: boolean;
    orderNum: any;
    passOrder: Function;
}

const OrderBox = ({ openOrder, orderNum, passOrder }: Props) => {

    const [ orderopen, setOrderOpen ] = useState<boolean>(false);
    const [ orderdata, setOrderdata ] = useState<any>('');
    const [ controlOpen, setControlOpen ] = useState<number>(0);
    const [ displayid, setDisplayID ] = useState<any>('');

   const getOrder = async (e:any) => {
        
        let param = {
            id: e,
            token: sessionStorage.getItem('token')
        }

        await fetch.outputOrder(param).then(
            (response:any) => {
                if(response.statusCode === 200){
                    setOrderdata(response.body.data);
                    const id_char_length = 6;
                    var display_id = '#';

                    for (let x = 1; x < id_char_length - response.body.data[0].nft_id.toString().length; x++ ){
                        display_id = display_id + '0';
                    }

                    display_id = display_id + response.body.data[0].nft_id.toString();
                    setDisplayID(display_id)
                    setOrderOpen(true);
                    setTimeout(()=>{
                        handlejump();
                    },5000);
                }
            },
            (error:any) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString;
            }
        )

    }

    if(openOrder){
        if(controlOpen === 0){
            setControlOpen(1);
            getOrder(orderNum);
        }
    }

    const handleClose = () =>{
        setOrderOpen(false);
        setControlOpen(0);
        passOrder(false);
        handlejump();
        window.location.href='/me';
    }

    const handlejump = () => {
        window.open('https://www.silkism.com/products/test-generative-art-hoodies', '_blank', 'noopener, noreferrer');
    }

    return (
        <>
            { orderNum && orderdata?(
                <>
            <Dialog
                open={orderopen}
                onClose={handleClose}
                maxWidth={'lg'}
                PaperProps={{ 
                    style: {
                        borderRadius: 25,
                        width: '80%',
                        position: 'relative',
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogContent>
                    <DialogContentText className='text-center'>
                        <div className='row d-flex justify-content-center position-relative mt-3 mb-3'>
                            <div className='w-25 d-flex justify-content-center'>
                                <img className='w-30 img-fluid' src={require('../Resources/Asset/images/image_loading_purple.png')} />
                            </div>
                        </div>
                        <div className='color-F91B fs-4'>
                            Transferring You to <a href='https://www.silkism.com/products/test-generative-art-hoodies' style={{textDecorationColor: '#F9A01B'}} className='color-F91B font-TTB'>www.silkism.com</a>,<br/>
                            <span className='font-TTB'>Type in Order No. </span> to proceed checkout
                        </div>
                        <div className='row'>
                            <div className='col color-7DFE fs-2'>
                                <b>Order No. {orderdata[0].Order_Id}</b>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col text-dark'>
                                Name: {orderdata[0].FirstName}{orderdata[0].lastname}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col text-dark'>
                                Email: {orderdata[0].EmailAddress}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col text-dark'>
                                Item: Theme x Silkism - {orderdata[0].ProductName}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col text-dark'>
                                {/* Artwork ID: #{orderdata[0].nft_id} */}
                                Artwork ID: {displayid}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col text-dark'>
                                Colour: {orderdata[0].Color}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col text-dark'>
                                Size: {orderdata[0].Size}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col text-dark'>
                                Price: HKD$ {orderdata[0].Price} {orderdata[0].Price_Remark}
                            </div>
                        </div>
                        <div className='color-F91B fs-5'>
                            please <a href='https://www.silkism.com/products/test-generative-art-hoodies' style={{textDecorationColor: '#7D75FE'}} className='color-7DFE'>click here</a> if the page does not lead you to the checkout page.
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            </>
            ):''}
        </>
    );
};

export default OrderBox;