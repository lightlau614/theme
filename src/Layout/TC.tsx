import React, { useState, useEffect} from 'react';
import styled from 'styled-components'

//Component
import Slidebar from '../Components/Slidebar';
import Collection_Header from '../Components/Collection_Header';
import Collection_Bottom from '../Components/Collection_Bottom';

// DialogBox
import TokenBox from '../Components/TokenBox';
import UserBox from '../Components/UserBox';
import SpinImage from '../Components/SpinImage';

const StyledBurgerMenu = styled.div`
    .bm-burger-bars{
    background: #F9A01B;
    }
`;

const TC = () => {

    const [ openToken, setOpenToken ] = useState<boolean>(false);
    const [ openLogin, setOpenLogin ] = useState<boolean>(false);
    const [ openDraw, setOpenDraw ] = useState<boolean>(false);
    const [ getForget, setGetForget ] = useState<any>('');
    const [ drawImage, setDrawImage ] = useState<any>('');

    const passToken = async ( item:any ) =>{
        setOpenToken(item);
        setOpenLogin(false);
        setOpenDraw(false);
        setGetForget(false);
    }

    const passLogin = async (item:any) => {
        setOpenLogin(item);
        setOpenToken(false);
        setOpenDraw(false);
        setGetForget(false);
    }

    const passDraw = async (item:any) => {
        setOpenLogin(false);
        setOpenToken(false);
        if(item.length){
            setOpenDraw(item[0].open);
            setDrawImage(item[0].img);
        }else{
            setOpenDraw(false);
            setDrawImage('');
        }
        setGetForget(false);
    }
    
    const passForget = async (item:any) => {
        setOpenLogin(false);
        setOpenToken(false);
        setOpenDraw(false);
        setGetForget(item);
    }

    const handleGoHome = () => {
        window.location.href = '/';
    }

    return (
        
            <>
                <SpinImage openDraw={openDraw} passDraw={passDraw} drawImage={drawImage} />
                <TokenBox openToken={openToken} passToken={passToken} passDraw={passDraw} />
                <UserBox openLogin={openLogin} passLogin={passLogin} getForget={ getForget }/>
                <div className='row d-flex bg-7DFE'>
                    <Collection_Header />
                    <div className='col-lg-1 p-2'>
                        <StyledBurgerMenu>
                            <Slidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} passToken={passToken} passLogin={passLogin} getForget={getForget}/>
                        </StyledBurgerMenu>
                    </div>
                </div>
                <div className='container'>
                    <div className='row lh-3 fs-4'>
                        <div className='col text-start'>
                            <span className='font-TT'><span role='button' onClick={handleGoHome}>Home</span> / </span><span className='font-QSB'>Terms and Conditions</span>
                        </div>
                    </div>
                    <div className='row'>
                    <div className='display-5 text-start color-7DFE mt-3 mb-3 font-TTB'>
                            Terms and Conditions
                        </div>
                        <div className='font-TT lh-2 text-start'>
                            <div className='mt-3 mb-3'>
                                Welcome to Theme Generative Fashion!
                            </div>
                            <div className='mt-3 mb-3'>
                                These terms and conditions outline the rules and regulations for the use of Theme Generative Fashion's Website, located at www.theme.com.hk.
                            </div>
                            <div className='mt-3 mb-3'>
                                By accessing this website, we assume you accept these terms and conditions. Do not continue to use Theme Generative Fashion if you do not agree to take all of the terms and conditions stated on this page.
                            </div>
                            <div className='mt-3 mb-3'>
                                Cookies:
                            </div>
                            <div className='mt-3 mb-3'>
                                <p>
                                    The website uses cookies to help personalize your online experience.
                                    By accessing Theme Generative Fashion, you agreed to use the required cookies.
                                </p>
                                <p>
                                    A cookie is a text file that is placed on your hard disk by a web page server. 
                                    Cookies cannot be used to run programs or deliver viruses to your computer. 
                                    Cookies are uniquely assigned to you and can only be read by a web server in 
                                    the domain that issued the cookie to you.
                                </p>

                                <p>
                                    We may use cookies to collect, store, and track information for statistical or 
                                    marketing purposes to operate our website. You have the ability to accept or decline 
                                    optional Cookies. There are some required Cookies that are necessary for the operation 
                                    of our website. These cookies do not require your consent as they always work. 
                                    Please keep in mind that by accepting required Cookies, you also accept third-party Cookies, 
                                    which might be used via third-party provided services if you use such services on our website, 
                                    for example, a video display window provided by third parties and integrated into our website.
                                </p>
                            </div>
                            <div className='mt-3 mb-3'>
                                License:
                            </div>
                            <div className='mt-3 mb-3'>
                                Unless otherwise stated, Theme Generative Fashion and/or its licensors own the intellectual property rights for all material on Theme Generative Fashion. All intellectual property rights are reserved. You may access this from Theme Generative Fashion for your own personal use subjected to restrictions set in these terms and conditions.
                            </div>
                            <div className='mt-3 mb-3'>
                                You must not:
                            </div>
                            <div className='mt-3 mb-3'>
                                <p>
                                    Copy or republish material from Theme Generative Fashion
                                    Sell, rent, or sub-license material from Theme Generative Fashion
                                    Reproduce, duplicate or copy material from Theme Generative Fashion
                                    Redistribute content from Theme Generative Fashion
                                    This Agreement shall begin on the date hereof.
                                </p>
                                <p>
                                    Parts of this website offer users an opportunity to post and exchange 
                                    opinions and information in certain areas of the website. Theme Generative 
                                    Fashion does not filter, edit, publish or review Comments before their presence 
                                    on the website. Comments do not reflect the views and opinions of Theme Generative Fashion, 
                                    its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts 
                                    their views and opinions. To the extent permitted by applicable laws, Theme Generative Fashion 
                                    shall not be liable for the Comments or any liability, damages, or expenses caused and/or 
                                    suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                                </p>
                                <p>
                                    Theme Generative Fashion reserves the right to monitor all Comments and remove any 
                                    Comments that can be considered inappropriate, offensive, or causes breach of these 
                                    Terms and Conditions.
                                </p>
                            </div>
                            <div className='mt-3 mb-3'>
                                You warrant and represent that:
                            </div>
                            <div className='mt-3 mb-3'>
                                You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;
                                The Comments do not invade any intellectual property right, including without limitation copyright, patent, or trademark of any third party;
                                The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful material, which is an invasion of privacy.
                                The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.
                                You hereby grant Theme Generative Fashion a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats, or media.
                            </div>
                            <div className='mt-3 mb-3'>
                                Hyperlinking to our Content:
                            </div>
                            <div className='mt-3 mb-3'>
                                <p>
                                    The following organizations may link to our Website without prior written approval:
                                </p>
                                <p>
                                    Social media organizations;
                                    Search engines;
                                    News organizations;
                                    Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and
                                    System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.
                                    These organizations may link to our home page, to publications, or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.
                                </p>
                                <p>
                                    We may consider and approve other link requests from the following types of organizations:
                                </p>
                                <p>
                                    commonly-known consumer and/or business information sources;
                                    dot.com community sites;
                                    associations or other groups representing charities;
                                    online directory distributors;
                                    internet portals;
                                    accounting, law, and consulting firms; and
                                    educational institutions and trade associations.
                                    We will approve link requests from these organizations if we decide that:
                                </p>
                                <p>
                                    (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; 
                                </p>
                                <p>
                                    (b) the organization does not have any negative records with us; 
                                </p>
                                <p>
                                    (c) the benefit to us from the visibility of the hyperlink compensates the absence of Theme Generative Fashion;
                                </p>
                                <p>
                                    and (d) the link is in the context of general resource information.
                                </p>
                                <p>
                                    These organizations may link to our home page so long as the link:
                                </p>
                                <p>
                                    (a) is not in any way deceptive; 
                                </p>
                                <p>
                                    (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products or services;
                                </p>
                                <p>
                                    and (c) fits within the context of the linking party's site.
                                </p>
                                <p>
                                    If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, 
                                    you must inform us by sending an e-mail to Theme Generative Fashion. Please include your name, your organization name, 
                                    contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, 
                                    and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
                                </p>
                                <p>
                                    Approved organizations may hyperlink to our Website as follows:
                                </p>
                                <p>
                                    By use of our corporate name; or<br/>
                                    By use of the uniform resource locator being linked to; or<br/>
                                    Using any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.
                                    No use of Theme Generative Fashion's logo or other artwork will be allowed for linking absent a trademark license agreement.
                                </p>
                            </div>
                            <div className='mt-3 mb-3'>
                                Content Liability:
                            </div>
                            <div className='mt-3 mb-3'>
                                We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are raised on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
                            </div>
                            <div className='mt-3 mb-3'>
                                Reservation of Rights:
                            </div>
                            <div className='mt-3 mb-3'>
                                We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                            </div>
                            <div className='mt-3 mb-3'>
                                Removal of links from our website:
                            </div>
                            <div className='mt-3 mb-3'>
                                If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links, but we are not obligated to or so or to respond to you directly.

                                We do not ensure that the information on this website is correct. We do not warrant its completeness or accuracy, nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                            </div>
                            <div className='mt-3 mb-3'>
                                Disclaimer:
                            </div>
                            <div className='mt-3 mb-3'>
                                To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:

                                limit or exclude our or your liability for death or personal injury;
                                limit or exclude our or your liability for fraud or fraudulent misrepresentation;
                                limit any of our or your liabilities in any way that is not permitted under applicable law; or
                                exclude any of our or your liabilities that may not be excluded under applicable law.
                                The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.
                            </div>
                        </div>
                    </div>
                </div>
                <Collection_Bottom />
            </>
    );
};

export default TC;