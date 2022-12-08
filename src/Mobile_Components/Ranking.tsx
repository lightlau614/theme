import React, { useState, useEffect } from 'react';
import MyCarousel from './Carousel';
import RankBoard from './RankBoard';
import fetch from '../Services/fetch';

const API_URL = "http://www.api_mongodb.com/nft/";

const Ranking = () => {
    const [list, setList] = useState<any>([]);

    useEffect(() => {
        fetch.getRank().then((response:any) => {
            setList(response);
        })
    },[])

    return (
        <div className='ranking-page'>
            <MyCarousel list={list}/>
            <RankBoard list={list}/>
        </div>
    );
};

export default Ranking;