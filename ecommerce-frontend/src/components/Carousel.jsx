import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeProductGrid from "./HomeproductsGrid";



function PauseOnHover() {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows:false
   
  };
  const imgLinks=[
    {url:"https://static1.srcdn.com/wordpress/wp-content/uploads/2020/03/Amazon-Go-Ad.jpg"},
    {url:"https://newspaperads.ads2publish.com/wp-content/uploads/2017/08/amazon-this-festive-season-for-home-electronics-come-to-apni-dukaan-ad-times-of-india-bangalore-25-08-2017.jpg"},
    {url:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOWBHhI19lruFYDBEV6-xDP8NamuEXShL_ClDt4IIfjSv4h60TmqkXG2Bd0Xpw0u0K5jK4tnJPUoCkoqriMr2Wy0uaGGmkoAyzyxopcS0j3PgsodPyrk2r_2mb1O4-0Peh57V6Pln77vlEhVwx88MgGXlRKkH4MNC4F645j9sI3cX5s-2k8aT0qx-lpooc/s1920/Come-iscriversi-Amazon-prime-HTNovo.jpg"}
  ];
  return (
    <div className="slider-container w-full overflow-hidden ">
      <Slider {...settings}>
       {imgLinks.map((link,i)=>(
        <div className="w-full  relative h-[70vh]" key={i}>
            <img src={link.url} alt="amazon" className="object-cover  w-full h-full" />
            <div className="absolute bottom-0  left-0 w-full h-24 bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none"></div>
        </div>
        
       ))}

      </Slider>
      
    </div>
  );
}

export default PauseOnHover;