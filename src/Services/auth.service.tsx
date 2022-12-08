import React from 'react';
import axios from 'axios';

const API_URL = 'http://api.theme.com.hk/nft/';
// const API_URL = "http://www.api_mongodb.com/nft/";
// const API_URL = "http://localhost:3000/nft/";

const register = ( values:any) => {
    return axios.post(API_URL + "register", { 
            values 
        })
        .then((response:any) => {
            return response.data;
        });

};

const login = ( email:String , password:String ) => {
    return axios.post(API_URL + "login", {
            email,
         password,
        })
        .then((response:any) => {
            if(response.data.statusCode === 200){
                sessionStorage.setItem("token", response.data.body.token);
            }
            return response.data;
        });
};

const logout = () => {
    sessionStorage.removeItem("token");
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem("user")||'{}');
};

const forget = (email:String) =>{

    return axios.put(API_URL + '/forgetmail', email)
            .then((response:any) => {

                return response;
            });

}

const AuthService = {
    register,
    login,
    logout,
    forget,
    getCurrentUser,
};

export default AuthService;