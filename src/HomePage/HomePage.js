import "./HomePage.css";
import styled from "@emotion/styled"
import { urlToRequest } from "loader-utils";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css"

// import Swiper core and required modules
import SwiperCore, {
    EffectCoverflow,Pagination,Navigation
  } from 'swiper/core';

  SwiperCore.use([EffectCoverflow,Pagination,Navigation]);

const Chatbox = styled.div(props=>({
    margin: "auto",
    position: "absolute",
    left: 0,
    right: 0,
    fontSize: !props.mobile ? "inherit": "2vh",
    top: !props.mobile ? "72vh": "38vh",
    borderRadius: "14px",
    background: "url(/images/chatbox.png) 0 0 / 300px auto no-repeat",
    width: !props.mobile ? "35vw" : "75vw",
    height: !props.mobile ? "10.8vw" : "23.2vw",
    padding: !props.mobile ? "1.4rem" : "1rem",
    boxSizing: "border-box",
    background: !props.mobile ? "url(/images/chatbox.png) 0 0/35vw auto no-repeat,white 0 0/40px 26px" : "url(/images/chatbox.png) 0 0/75vw auto no-repeat,white 0 0/40px 26px"
}))
const SwiperContainer = styled.div(props=>({
    // margin: "auto",
    position: "absolute",
    // left: 0,
    // right: 0,
    // top: !props.mobile ? "62vh": "35vh",
    // borderRadius: "14px",
    // background: "url(/images/chatbox.png) 0 0 / 300px auto no-repeat",
    width: !props.mobile ? "100%" : "75vw",
    height: !props.mobile ? "250px" : "23.2vw",
    // padding: !props.mobile ? "1.4rem" : "1rem",
    // boxSizing: "border-box",
    // background: !props.mobile ? "url(/images/chatbox.png) 0 0/55vw auto no-repeat,white 0 0/40px 26px" : "url(/images/chatbox.png) 0 0/75vw auto no-repeat,white 0 0/40px 26px"
}))
const PokeCard = styled.div(props=>({
    background: "linear-gradient(#0bad5c,#CE1F6A,#004e47)",
    // background: "linear-gradient(#CE1F6A,#ce1f90,#e2176282)",
    // background: "linear-gradient(#CE1F6A,#ce1f70,#e2171782)",
    // background: "radial-gradient(pink,#CE1F6A)",
    // background: "#CE1F6A",
    width:"100%",
    height:"100%"
}))
export const HomePage = () => {
    const chatbox = React.useRef(null);
    const chatstring = "Welcome pokemon catchers! Find your favorite pokemon on the PokeBall and collect them all into your Bag!";
    const [orientation, setOrientation] = React.useState(true);
    React.useEffect(()=>{
        chatbox.current.innerHTML = " ";
        if(window.innerWidth > window.innerHeight){
            setOrientation(false)
        }
        // console.log(Array.from(chatstring))
        // console.log(chatbox.current.innerHTML)
        Array.from(chatstring).forEach((item,idx)=>{
            setTimeout(()=>{
                if(chatbox?.current?.innerHTML || false)
                chatbox.current.innerHTML += item
            },70 * idx)
        })
        // .then(()=>{
        //     console.log("complete")
        // });
    },[chatbox])
    return (
        <div className="homepage">
            {/* <img className="logo" src="/images/logo.png" alt="logo"/> */}
            <div className="title-container">

            <h1 className="title">PokéMon Center</h1>
            </div>
            <section className="billboard">
                <img src="/images/homeImge.png" alt="homeImage"/>
                {/* <img src="/images/chatbox.png" alt="chatbox"/> */}
                {/* <div className="chatbox"></div> */}
                <Chatbox ref={chatbox} mobile={orientation}> </Chatbox>
                <div>

                </div>
            </section>
            <section className="drawer">
                <h2 className="most-popular">Most Popular Pokemon</h2>
            <SwiperContainer>
                {/* <Swiper effect={'coverflow'} navigation={true} grabCursor={true} centeredSlides={false} slidesPerView={'auto'} coverflowEffect={{
                "rotate": 50,
                "stretch": 0,
                "depth": 100,
                "modifier": 1,
                "slideShadows": true
                }} pagination={true}  className="mySwiper">
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-6.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></SwiperSlide><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-9.jpg" /></SwiperSlide>
                </Swiper> */}
                <Swiper effect={"coverflow"} navigation={true} loop={true} grabCursor={true} centeredSlides={false} slidesPerView={'auto'} coverflowEffect={{
                "rotate": 50,
                "stretch": 0,
                "depth": 100,
                "modifier": 1,
                "slideShadows": false
                }} className="mySwiper">
                <SwiperSlide>
                    <PokeCard>
                    <img className="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png" />
                    <p>GRENINJA</p>
                    </PokeCard>
                </SwiperSlide>
                <SwiperSlide>
                    <PokeCard>
                    <img className="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png" />
                    <p>Lucario</p>
                    </PokeCard>
                </SwiperSlide>
                <SwiperSlide>
                    <PokeCard>
                    <img className="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" />
                    <p>Charizard</p>
                    </PokeCard>
                </SwiperSlide>
                <SwiperSlide>
                    <PokeCard>
                    <img className="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png" />
                    <p>Umbreon</p>
                    </PokeCard>
                </SwiperSlide>
                <SwiperSlide>
                    <PokeCard>
                    <img className="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png" />
                    <p>Sylveon</p>
                    </PokeCard>
                </SwiperSlide>
                <SwiperSlide>
                    <PokeCard>
                    <img className="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png" />
                    <p>Garchomp</p>
                    </PokeCard>
                </SwiperSlide>
                <SwiperSlide>
                    <PokeCard>
                    <img className="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png" />
                    <p>Rayquaza</p>
                    </PokeCard>
                </SwiperSlide>
                <SwiperSlide>
                    <PokeCard>
                    <img className="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png" />
                    <p>Gardevoir</p>
                    </PokeCard>
                </SwiperSlide>
                <SwiperSlide>
                    <PokeCard>
                    <img className="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" />
                    <p>Gengar</p>
                    </PokeCard>
                </SwiperSlide>
                <SwiperSlide>
                    <PokeCard>
                    <img className="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/887.png" />
                    <p>Dragapult</p>
                    </PokeCard>
                </SwiperSlide>
                </Swiper>
            </SwiperContainer>
            </section>
        </div>
    );
}