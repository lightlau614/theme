import React from 'react';
import Carousel from 'react-multi-carousel';
import CarouselItem from './CarouselItem';
import 'react-multi-carousel/lib/styles.css';

interface Props{
    list: any;
}

const ButtonGroup = ({next, previous, goToSlide, ...rest}: any) => {
    const loadNext = () => {

    }

    return (
        <div className='container'>
            <div className="carousel-button-group row justify-content-between"
            style={{
                position: 'absolute',
                left: "50%",
                top: "50%",
                transform: 'translate(-50%, -50%)',

            }}>
                <div className='col align-self-start carousel-left-btn'>
                    <img onClick={() => previous()} src={require('../Resources/Asset/images/Btn_Left.png')} className='carousel-btn'></img>
                </div>
                <div className='col align-self-end carousel-right-btn'>
                    <img onClick={() => next()} src={require('../Resources/Asset/images/Btn_Right.png')} className='carousel-btn'></img>
                </div>
                
                
            </div>
        </div>
    )
}

const MyCarousel = ({list}: Props) => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3 // optional, default to 1.
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
          }
    }

    return (
        <div className='Carousel-Container w-75 position-relative' 
        style={{
            position: 'absolute',
            left: "50%",
            transform: 'translate(-50%, 0%)',

        }}>
            <Carousel 
            responsive={responsive}
            arrows={false}
            customButtonGroup={<ButtonGroup/>}
            renderButtonGroupOutside={true}
            >
                {list && list.map((item:any, i:any)=>{
                    return(
                        <CarouselItem src={item.ImageSrc} like={item.likes} nft_id={item.nft_id}/>
                    )
                })}
            </Carousel>
        </div>
    );
};

export default MyCarousel;