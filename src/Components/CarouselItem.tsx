import React, { useState } from 'react';

interface Props{
    src: string;
    like: number;
    nft_id: any;
}

const imageAPI = "http://api.theme.com.hk/download/?name=";
// const imageAPI = "http://www.api_mongodb.com/download/?name=";
// const imageAPI = 'http://localhost:3000/download/?name='

const CarouselItem = ({src, like, nft_id}: Props) => {

    const id_char_length = 6;
    var display_id = '#';
    
    for (let x = 1; x < id_char_length - nft_id.toString().length; x++ ){
        display_id = display_id + '0';
    }

    display_id = display_id + nft_id.toString();
    

    return (
        <div className='card position-relative'>
            <img src={imageAPI+src} className='card-img '/>
            <div className='position-absolute'>
                <img src={require('../Resources/Asset/images/Trending_Gradient_cube.png')} className='img-fluid' style={{borderRadius: '25px'}}/>
            </div>
            <div className='card-img-overlay text-start' >
                {/* <h1 className='card-title'>#{nft_id}</h1> */}
                <div className='fs-5 font-TTB'>{display_id}</div>
                <span className='fs-5 '>{like} likes</span>
            </div>

        </div>
    );
};

export default CarouselItem;