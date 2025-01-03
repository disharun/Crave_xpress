import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Header.css";

// Import local images
import image1 from "../../assets/ai-food.jpg";
import image2 from "../../assets/png-tree.jpg";
import image3 from "../../assets/rustic-bowl.jpg";

const Header = () => {
  const menu = useRef(null);

  const scrollToMenu = () => {
    menu.current.scrollIntoView({ behavior: "smooth" });
  };

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

  const images = [image1, image2, image3];

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
        <h2>Order Now</h2>
        <button onClick={scrollToMenu}>View Menu</button>
      </div>
      <div ref={menu} />
    </div>
  );
};

export default Header;
