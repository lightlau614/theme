import {useEffect, useState} from "react";
import Marquee from "react-fast-marquee";
import MarqueeItem from "./MarqueeItem";
// import Rand from "../Services/rand";

const MyMarquee = () =>{

    const [direction, setDirection] = useState("left")
    const [speed, setSpeed] = useState(100)
    const [count, setCount] = useState(0);

    let test =0;

    useEffect(()=>{
        for (var i = 0; i<10; i++){
            test = test +1;
            console.log(test);
        }
    },[]);

    const DoChaos = () =>{
        setSpeed(100+300*count)
    }

    const increaseCount = () =>{
        setCount(count+1)
        DoChaos()
    }

    return (
        <Marquee pauseOnHover={true} speed={speed} gradientWidth={0} className="box-menu-bar">
            <MarqueeItem src="\resources\images\1.png" updateCount={increaseCount}/>
            <MarqueeItem src="\resources\images\2.png" updateCount={increaseCount}/>
            <MarqueeItem src="\resources\images\3.png" updateCount={increaseCount}/>
            <MarqueeItem src="\resources\images\4.png" updateCount={increaseCount}/>
            <MarqueeItem src="\resources\images\5.png" updateCount={increaseCount}/>
            <MarqueeItem src="\resources\images\6.png" updateCount={increaseCount}/>
        </Marquee>
    )
}

export default MyMarquee;