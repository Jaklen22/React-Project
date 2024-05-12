import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import { toast } from 'react-toastify';

export default function Details() {
  let {addToCart,setcartNumber} = useContext(cartContext)

  const [productDetails, setDetails] = useState(null);
  let params = useParams();
  let pId = params.id;

  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${pId}`
    );
    setDetails(data.data);
  }

  useEffect(() => {
    getProduct();
  }, [])
  async function addToMyCart(id){
    let {data} = await  addToCart(id)
    //console.log(data)
    if(data.status ==='success'){
     toast.success(data.message)
     setcartNumber(data.numOfCartItems)

    }
   
   }


  return (
    <div className="container my-3">
      <div className="row ">
        <div className="col-md-3">
          <img className="w-100" alt="pimg" src={productDetails?.imageCover} />
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-around">
          <div>
            <h2>{productDetails?.title}</h2>
            <p>{productDetails?.description}</p>
          </div>
          <div>
            <p>{productDetails?.category.name}</p>

            <div className="d-flex justify-content-between">
              <p>
                <span>Price :</span>
                {productDetails?.price}
              </p>
              <p>
                <span>{productDetails?.ratingsAverage}</span>
                <i className="fa-solid fa-star rating-color" style={{color:"orange"}}></i>
              </p>
            </div>
            <button  onClick={()=>{addToMyCart(productDetails._id)}} className="btn btn-success">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
