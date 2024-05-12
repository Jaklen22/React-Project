import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function Category() {
  const [catList , setcatList] = useState([])
   async function getCategory(){
   let {data}  = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
   setcatList(data.data)


  }
  useEffect(()=>{
    getCategory()
       },[])


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <div>
    <Slider {...settings}>
    {catList.map((category)=>{
      return <>
      <img src={category.image} alt='cat' className='w-100' height={300}/>
      <p>{category.name}</p>
      </>
    })}
    </Slider>
    </div>
  )
}
