import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import { Link } from 'react-router-dom';

export default function Cart() {
  let [data, setdata] = useState([]);
  let [cartPrice, setcartPrice] = useState([]);
  let { getCart,deleteCart,updateCart,setcartNumber } = useContext(cartContext);

  useEffect(() => {
    (async () => {
      let data = await getCart();
      setdata(data.data.data.products);
      setcartPrice(data.data.data.totalCartPrice);
    })();
  }, []);

async function  removeProduct(id){
  let data = await deleteCart(id)
  setdata(data.data.data.products);
  setcartPrice(data.data.data.totalCartPrice);
  setcartNumber(data.data.numOfCartItems)

  }

  async function  updateProduct(id,count){
    if(count === 0){
      removeProduct(id)

    }else{
      let data = await updateCart(id,count)
      setdata(data.data.data.products);
     setcartPrice(data.data.data.totalCartPrice);
      setcartNumber(data.data.numOfCartItems)

    }
  
  
    }


  return (
    <div className="container ">
      <h2 className="m-5">Shopping Cart</h2>
      <div className="text-end mx-5">
      <Link to='/checkout' >
      <button className="btn btn-success">onlinePayment</button>
      </Link>
      </div>
      <div className="row">
        <div
          className="col-md-11 bg-main-light shadow p-5 m-auto my-5"
          style={{ background: "Azure" }}
        >
          <h3 style={{ color: "green", fontWeight: "bold" }}>
            <span>Total Price </span>
            {cartPrice}
          </h3>
          {data.map((product) => {
            return (
              <div className="row border-bottom py-5" key={product._id}>
                <div className="col-md-1">
                  <img
                    src={product.product.imageCover}
                    alt="pimage"
                    className="w-100"
                  />
                </div>
                <div className="col-md-11 d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{product.product.title}</h5>
                    <p>{product.price}</p>
                    <button className="btn btn-outline-danger" onClick={()=>{removeProduct(product.product._id)}}>
                      <i className="fa-regular fa-trash-can mx-1"></i>Remove
                    </button>
                  </div>
                  <div>
                    <button onClick={()=>{updateProduct(product.product._id,product.count+1)}} className="btn btn-outline-success">+</button>
                    <span className="mx-2">{product.count}</span>
                    <button onClick={()=>{updateProduct(product.product._id,product.count-1)}} className="btn btn-outline-primary">-</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
