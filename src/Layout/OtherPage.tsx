import React, { useState, useEffect } from 'react';

import axios from 'axios';

const API_URL = 'http://localhost:3000/nft/'

const imageAPI = "http://www.api_mongodb.com/download/?name=";

const OtherPage = ( ) => {

    const [ rawData, setRawData ] = useState<any>('')

    const handleCall = async () => {
        await axios.get(API_URL + 'getNFTtoken')
            .then((response:any)=>{
                 setRawData(response.data.body.data);
            });
    }

    useEffect(()=>{
        handleCall()
    },[])

    return (
        <div className='row w-80 m-auto'>
            <table className="table table-striped table-primary table-hover text-center fs-5 table-bordered border-dark">
                <thead>
                    <tr>
                        <th>
                            NFT IMAGE
                        </th>
                        <th>
                            NFT ID
                        </th>
                        <th>
                            Token
                        </th>
                        <th>
                            User
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Color
                        </th>
                        <th>
                            Size
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rawData? rawData.map((item:any, index:any)=>{
                        return (
                            <>
                                <tr>
                                    <td style={{
                                            width: '250px',
                                            height: '250px',
                                            position: 'relative'
                                        }}>
                                        <img src={imageAPI + item.ImageSrc} className='position-absolute div-center' style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%'}}/>
                                    </td>
                                    <td style={{ fontSize: '24px', textAlign:'center', margin:'auto', verticalAlign: 'middle'}}>
                                    # {item.nft_id}
                                    </td>
                                    <td style={{ fontSize: '12px', textAlign:'center', margin:'auto', verticalAlign: 'middle'}}>
                                    {item.token_code}
                                    </td>
                                    <td style={{width: '250px'}}>
                                    
                                    </td>
                                    <td style={{width: '250px'}}>
                                    
                                    </td>
                                    <td style={{width: '250px'}}>
                                    
                                    </td>
                                    <td style={{width: '250px'}}>
                                    
                                    </td>
                                </tr>
                            </>
                        )})
                    :''}
                </tbody>
            </table>
        </div>
    );
};

export default OtherPage;