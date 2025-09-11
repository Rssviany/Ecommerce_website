import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function CarouselForProductsList({ items }) {
    var settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const navigate = useNavigate();

    return (
        <div className="slider-container px-4 relative">
            <Slider {...settings}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="px-2 cursor-pointer"
                        onClick={() => navigate(`/products/${item.id}`)}
                    >
                        <img
                            src={item.url}
                            alt={item.name}
                            className="w-full h-48 object-cover shadow-lg"
                        />
                        <p className="mt-2 text-sm font-semibold truncate text-blue-500 hover:text-gray-800 hover:border-b-[1px]">{item.name}</p>
                        <p className="text-lg font-[500] text-lack">₹{item.price}</p>
                        <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, i) => {
                                const ratingValue = i + 1;
                                if (item.rating >= ratingValue) {
                                    return <FaStar key={i} className="text-yellow-400" />;
                                } else if (item.rating >= ratingValue - 0.5) {
                                    return <FaStarHalfAlt key={i} className="text-yellow-400" />;
                                } else {
                                    return <FaRegStar key={i} className="text-yellow-400" />;
                                }
                            })}
                            <span className="ml-1 text-sm text-gray-500">({item.reviews})</span>
                        </div>

                    </div>
                ))}

            </Slider>
        </div>
    );
}

export default CarouselForProductsList;