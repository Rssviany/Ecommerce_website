import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

function Responsive ({ items }) {
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
        {items.map((each, i) => (
          <div className="px-2 cursor-pointer" key={i} onClick={()=>{navigate(`/products/${each.id}`);}}>
            <img src={each.url} alt={`image ${i + 1}`} className="w-full h-48 object-cover shadow-lg" />

          </div>
        ))}

      </Slider>
    </div>
  );
}

export default Responsive;

