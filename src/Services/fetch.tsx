import React from 'react';
import axios from 'axios';

const API_URL = "http://api.theme.com.hk/nft/";
// const API_URL = "http://www.api_mongodb.com/nft/";
// const API_URL = "http://localhost:3000/nft/";

const checktokenexchange = ( tokenenchange: string) => {

    let params = {
        secretToken: sessionStorage.getItem('token'),
        tokenCode: tokenenchange,
    };

    return axios.get(API_URL + "getNFTFromToken", {
            params
        })
        .then((response:any) => {
            return response.data;
        });

}

const fetchItem = ( product: any ) => {
   
    let params = {
        product: product
    }

    return axios.get(API_URL + "getProduct", {
                params
            }).then((response:any) => {
                return response.data;
            })

}

const fetchAllNFT = () => {
    var token = sessionStorage.getItem("token");

    let params = {
        params:{
            token: token? token: null
        }
    }

    return axios.post(API_URL + "getAllnft", params).then((response:any)=>{
            
            return response.data;
        });
}

const fetchNFT = ( token: any) =>{

    let params = {
        token: token
    }

    return axios.get(API_URL + "getownnft", {
        params
    }).then((response:any)=>{
        return response.data;
    })

}

const outputOrder = ( order:any ) => {

    let params = {
        order_id: order.id,
        token: order.token
    }

    return axios.get( API_URL + "orderRecord", {
                params
            }).then((response:any)=>{
                return response.data
            })
    
}

const payOrder = ( req:any) => {

    let params = {
        token: sessionStorage.getItem('token'),
        nft_id : req.nft_id,
        nft : req.nft,
        color : req.color,
        size : req.size,
        remark: req.remark
    }

    return axios.post(API_URL + "order", {
                params
            }).then((response:any)=>{
                return response.data;
            });
}

const registerToken = (token:any) => {
    
    let params = {
        secretToken: sessionStorage.getItem('token'),
        tokenCode: token,
    };

    return axios.post(API_URL + "registerToken", {
            params
        })
        .then((response:any) => {
            return response.data;
        });
}

const registerNFT = (nft_id:any) => {
    
    let params = {
        secretToken: sessionStorage.getItem('token'),
        nft_id: nft_id,
    };

    return axios.put(API_URL + "registerNFT", {
            params
        })
        .then((response:any) => {
            return response.data;
        });

}

const getRank = async () => {
    return axios.get(API_URL+"rank").then(
        (response: any)=>{
            return response.data;
        })
}

const sendForget = async (req: any) =>{
    let params = {
        params:{
            email: req.email,
        }
    }

    return axios.post(API_URL+"forget", params).then(
        (response:any)=>{
            return response;
        }
    )
}

const resetPassword = async (req: any) => {
    let params = {
        params:{
            token: req.token,
            password: req.password,
        }
        
    }
    return axios.put(API_URL+"setPassword", params).then(
        (response:any)=>{
            return response;
        }
    )
}

const like = async (token: any, nft_id:any) =>{
    let params = {
        params:{
            token: token,
            nft_id: nft_id
        }
    }
    return axios.post(API_URL+"like", params).then(
        (response:any)=>{
            return response;
        }
    )
}
const fetchLike = async (req: any) =>{
    let params = {
        param:{
            user_id: req.user_id
        }
    }
    return axios.post(API_URL+"fetchLike", params).then(
        (response:any)=>{
            return response;
        }
    )
}

const shareNFT = async (nft_id: any, targetEmail: any) => {

    if (sessionStorage.getItem("token")){
        let params = {
            params:{
                token: sessionStorage.getItem("token"),
                nft_id: nft_id,
                targetEmail: targetEmail
            }
        }

        return axios.post(API_URL+"share", params).then(
            (response:any)=>{
                return response.data;
            }
        )
    }
    else{
        alert("Please login first.");
        return
    }
}

const handleTransfer = (TransferToken:any) =>{
    if (sessionStorage.getItem("token")){
        let params = {
            params:{
                token: sessionStorage.getItem("token"),
                transferToken: TransferToken,
            }
        }
        return axios.put(API_URL+"transfer", params).then(
            (response:any)=>{
                return response;
            }
        )
    }
    else{
        alert("Please login first.");
        return
    }
}

const handleVerify = (VerifyToken:any) =>{
    let params = {
        params:{
            verifyToken: VerifyToken,
        }
    }
    return axios.put(API_URL+"verify", params).then(
        (response:any)=>{
            console.log(response);
            return response;
        }
    )
}

const getTransfer = (nft_id:any) => {
    let params = {
        params:{
            nft_id: nft_id,
        }
    }

    return axios.get(API_URL+"transfer", params).then(
        (response:any)=>{
            return response.data;
        }
    )
}

const getUserName = () =>{
    if (sessionStorage.getItem("token")){
        let token = sessionStorage.getItem("token");

        return axios.get(API_URL+"getUserName/"+token).then(
            (response:any)=>{
                return response.data;
            }
        )
    }
}

const fetchOrder = (nft_id:any) =>{
    let params ={}
    if(nft_id.indexOf('.') > -1){
        const temp = nft_id.split('.');
        params = {
            params : {
                nft_id: temp[0],
            }
        }
    }else{
        params = {
            params : {
                nft_id: nft_id,
            }
        }
    }

    return axios.get(API_URL + "order", params).then(
        (response:any)=>{
            return response.data;
        }
    )
}

const fetch = {
    checktokenexchange,
    fetchItem,
    fetchAllNFT,
    fetchNFT,
    payOrder,
    outputOrder,
    registerToken,
    registerNFT,
    getRank,
    sendForget,
    resetPassword,
    like,
    fetchLike,
    shareNFT,
    handleTransfer,
    handleVerify,
    getTransfer,
    getUserName,
    fetchOrder,
};

export default fetch;