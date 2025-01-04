import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Header.css";

// Import local images
import image1 from "../../assets/rustic-bowl.jpg";
import image2 from "../../assets/d.png";


const Header = () => {
  const [text, setText] = useState("Order Now");  // Default text
  const menu = useRef(null);

  // Function to change text every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => {
        if (prevText === "Order Now") {
          return "Fresh & Delicious! ";
        } else if (prevText === "Fresh & Delicious!") {
          return "Satisfy Your Hunger !";
        } else {
          return "Order Now !";
        }
      });
    }, 1000); // Slow change every 4 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const images = [image1, image2];

  return (
    <div className="header">
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <div key={index} className="slider-item">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="slider-image"
            />
          </div>
        ))}
      </Slider>
      <div className="header-contents">
        <h2 className="fade-text">{text}</h2>
      </div>
      <div ref={menu} />
    </div>
  );
};

export default Header;
