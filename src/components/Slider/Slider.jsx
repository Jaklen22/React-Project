import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/img/camera-5305154_640.jpg"
import img2 from "../../assets/img/images.jpeg"
import img3 from "../../assets/img/cosmetics-products-photography1.jpg"
import img4 from "../../assets/img/images (2).jpeg"
import img5 from "../../assets/img/images (1).jpeg"





export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="row g-0">
      <div className="col-md-8">
      <Slider  {...settings}>
      <img src={img4} alt="img1" className="w-100" height={400}/>
      <img src={img3} alt="img1" className="w-100" height={400}/>
      <img src={img5} alt="img1" className="w-100" height={400}/>


      </Slider>

      </div>
      <div className="col-md-4">
      <img src={img1} alt="img1" className="w-100" height={200}/>
      <img src={img2} alt="img2"  className="w-100" height={200}/>
      </div>
    </div>
  );
}
