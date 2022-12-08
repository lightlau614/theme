import React from 'react';
import axios from 'axios';

// const API_URL = "http://www.api_mongodb.com/";
const API_URL = "http://localhost:3000/";

const Rand = async () => {
    var response = await getProductStatus();
    if (response.avaliable) {
        var nft_id = doDraw(response.result);
        const userID = sessionStorage.getItem("user");
        registerNFT(userID, nft_id);
    }
};

const doDraw = (list: Array<any>) => {
    if (list.length == 0){
        return -1;
    }
    else{
        const random = Math.floor(Math.random() * list.length);
        return (list[random].nft_id);
    }
}

const getProductStatus = async () =>{
    return axios.get(API_URL+"nft/"+"getAvaliableNFT")
    .then((response:any)=>{
        return response;
    })
}

const registerNFT = async (username:any, nft_id:any) =>{
    return axios.put(API_URL+"nft/"+"registerNFT", {
        username: username,
        nft_id: nft_id
    })
    .then((response:any)=>{
        
    })
}

export default Rand;