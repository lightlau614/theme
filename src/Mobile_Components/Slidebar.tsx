import React, { useEffect, useState } from 'react';
import { slide as Menu } from "react-burger-menu";
import { BsFillPersonFill } from "react-icons/bs";
import fetch from '../Services/fetch';

type SidemenuProps = {
    pageWrapId: string;
    outerContainerId: string;
    passToken: Function;
    passLogin: Function;
    getForget: string;
  };

const Slidebar = ({ pageWrapId, outerContainerId, passToken, passLogin, getForget }: SidemenuProps ) => {

  const [ firstName, setFirstName ] = useState<string>('User');
  const [ lastName, setLastName ] = useState<string>('');

  const handleLogin = async ( event:any ) => {
    passLogin(true);
  }

  const handleToken = async ( event:any ) => {
    passToken(true);
  }

  const handleSignOut = (event:any) => {
    sessionStorage.removeItem("token");
    window.location.reload();
  }

  const setProfileName = async () =>{
    fetch.getUserName()?.then((response)=>{
        if (response){
            setFirstName(response.FirstName);
            setLastName(response.LastName);
        }
    })
}

  useEffect(()=>{
    setProfileName();
},[])

  return (
      <Menu pageWrapId={pageWrapId} outerContainerId={outerContainerId} right  width={230}>
        <a className="menu-item" href="/">
          Home
        </a>
        <a className="menu-item" href="/collection">
          Theme X Silkism
        </a>
        <a className="menu-item" href="/gallery">
          Gallery
        </a>
       
        {!sessionStorage.getItem('token')?
          <a className="menu-item" href="#" onClick={handleLogin}>
            Sign Up / Log in
          </a>
        :
        (
          <>
            {sessionStorage.getItem('token')?(
              <>
                <a className="menu-item" href="#" onClick={handleToken}>
                  Redeem Token
                </a>
                <a className="menu-item" href="/me">
                  <BsFillPersonFill className='text-white' />{`${firstName} ${lastName}`}
                </a>
              </>
            ):''}
            <a className="menu-item" onClick={handleSignOut} role='button'>
              Log out
            </a>
          </>
        )}
      </Menu>
  );
};

export default Slidebar;