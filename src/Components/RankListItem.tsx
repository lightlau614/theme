import React from 'react';

interface Props{
    rank: number;
    data: any;
}

const imageAPI = "http://api.theme.com.hk/download/?name=";
// const imageAPI = "http://www.api_mongodb.com/download/?name=";
// const imageAPI = 'http://localhost:3000/download/?name='

const RankListItem = ({rank, data}: Props) => {

    const id_char_length = 6;
    var display_id = '#';
    
    for (let x = 1; x < id_char_length - data.nft_id.toString().length; x++ ){
        display_id = display_id + '0';
    }

    display_id = display_id + data.nft_id.toString();

    return (
        <>
            <div className='row font-TT fs-4 mt-3 mb-3 font-TTB'>
                <div className='col col-sm-9 col-md-9 col-lg-9'>
                    <div className='row'>
                        <div className='col col-sm-2 col-md-2 col-lg-2 mt-auto mb-auto'>
                            {rank}.
                        </div>
                        <div className='col col-sm-5 col-md-5 col-lg-5 position-relative p-0' style={{borderRadius: '15px', border : '2px solid #FFF'}}>
                            <div className='p-1 position-relative h-100'>
                                <img src={ imageAPI+data.ImageSrc } className="img-fluid" />
                            </div>
                        </div>
                        <div className='col col-sm-3 col-md-3 col-lg-3 mt-auto mb-auto'>
                            {display_id}
                        </div>
                    </div>
                </div>
                <div className='col col-sm-3 col-md-3 col-lg-3 mt-auto mb-auto text-end font-TT'>
                    {data.likes} likes
                </div>
            </div>
        </>
        
    );
};

export default RankListItem;