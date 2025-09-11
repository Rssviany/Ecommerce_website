import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import returning from '../assets/returning.png';
import freedelivery from '../assets/freedelivery.png';
import warranty from '../assets/warranty.png';
import cash from '../assets/cash.png';
import topbrand from '../assets/topbrand.png';
import installation from '../assets/installation.png';
import devlivered from '../assets/delivered.png';
import secure from '../assets/secure.png';


function Responsive() {
    const amazonPromise = [
        { img: returning, title: "10 days Service Centre Replacement" },
        { img: freedelivery, title: "Free Delivery" },
        { img: warranty, title: "Warranty Policy" },
        { img: cash, title: "Cash/Pay Delivery" },
        { img: topbrand, title: "Top Brand" },
        { img: installation, title: "Free Installation Available" },
        { img: devlivered, title: "Free Delivery" },
        { img: secure, title: "Top Secure" },

    ]
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    };
    return (
        <div className="slider-container mt-10 z-0">
            <Slider {...settings}>
                {amazonPromise.map((each, i) => (
                    <div key={i} className="flex items-center ">          
                        <div className="flex flex-col items-center">
                            <img
                                src={each.img}
                                alt={each.title}
                                className="w-8 h-8 rounded-full bg-gray-100 object-cover mb-2 p-1"
                            />
                            <div className="w-25 h-20 flex justify-center">
                            <span
                                className="text-blue-400 hover:text-gray-800 hover:underline cursor-pointer text-[12px] transition-colors duration-200"
                            >
                                {each.title}
                            </span>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Responsive;
