import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
 
// Component
import Body from './Body';
import Main from './Main';
import Admin from './Admin';
import ProductSelling from './ProductSelling';
import Collection from './Collection';
import Collection_NFT from './Collection_NFT';
import Collaboration from './Collaboration';
import OtherPage from './OtherPage';
import MyProfile from './MyProfile';
import Art_Intro from './Art_Intro';
import TC from './TC';


//Component_Mobile
import Body_Mobile from '../Mobile_Layout/Body';
import Main_Mobile from '../Mobile_Layout/Main';
import ProductSelling_Mobile from '../Mobile_Layout/ProductSelling';
import Collection_Mobile from '../Mobile_Layout/Collection';
import Collection_NFT_Mobile from '../Mobile_Layout/Collection_NFT';
import Collaboration_Mobile from '../Mobile_Layout/Collaboration';
import Art_Intro_Mobile from '../Mobile_Layout/Art_Intro';
import MyProfile_Mobile from '../Mobile_Layout/MyProfile';
import TC_Mobile from '../Mobile_Layout/TC';


const Home = () => {

    return (
        <Router>
                <BrowserView>
                    <Routes>
                        <Route path='/Collaborations' element={<Collaboration />} />
                        <Route path='/gallery' element={<Collection />} />
                        <Route path='/gallery/:id' element={<Collection_NFT />} />
                        <Route path='/product/:item/:nft' element={<ProductSelling />} />
                        <Route path='/art_intro' element={<Art_Intro />} />
                        <Route path='/collection' element={<Main /> } />
                        <Route path='/collection/verify/:VerifyToken' element={<Main /> }/>
                        <Route path='/collection/forget/:token' element={<Main /> }/>
                        <Route path='/collection/transfer/:TransferToken' element={<Main />}/>
                        <Route path='/me' element={<MyProfile /> }/>
                        <Route path='/tc' element={<TC /> }/>
                        <Route path='/' element={<Body />} />
                    </Routes>
                </BrowserView>
                <MobileView>
                    <Routes>
                        <Route path='/Collaborations' element={<Collaboration_Mobile />} />
                        <Route path='/gallery' element={<Collection_Mobile />} />
                        <Route path='/gallery/:id' element={<Collection_NFT_Mobile />} />
                        <Route path='/product/:item/:nft' element={<ProductSelling_Mobile />} />
                        <Route path='/art_intro' element={<Art_Intro_Mobile />} />
                        <Route path='/collection' element={<Main_Mobile /> } />
                        <Route path='/collection/verify/:VerifyToken' element={<Main_Mobile /> }/>
                        <Route path='/collection/transfer/:TransferToken' element={<Main />}/>
                        <Route path='/collection/forget/:token' element={<Main_Mobile /> }/>
                        <Route path='/me' element={<MyProfile_Mobile /> }/>
                        <Route path='/tc' element={<TC_Mobile /> }/>
                        <Route path='/' element={<Body_Mobile />} />
                    </Routes>
                </MobileView>
        </Router>
    );
};

export default Home;    