import axios from 'axios'
import style from './Product.module.scss'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import { toast } from 'react-toastify';

export default function Product() {
let {addToCart,setcartNumber} = useContext(cartContext)
let [productList ,setproductList] = useState([])

 async function getProducts(){
   let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products')
   setproductList(data.data)
 
  }
useEffect(()=>{
  getProducts()
},[])

 async function addToMyCart(id){
 let {data} = await  addToCart(id)
 //console.log(data)
 if(data.status ==='success'){
  toast.success(data.message)
  setcartNumber(data.numOfCartItems)
 }

}

  return (
    <div className='row '>
    
    {productList.length > 0 ?
      <>
      {productList.map((prd)=>{
        return <div className='col-md-3  p-3' key={prd._id}>
        <div className={style.product}>  
        <Link to={`/detials/${prd._id}`} style={{textDecoration:"none" ,color:"black"} }>
        <img src={prd.imageCover} className='w-100' alt='prdImage' height={300}/>
        <p style={{color:"green"}}>{prd.category.name}</p>
        <h6>{prd.title}</h6>
        <div className='d-flex justify-content-between'>
        <p>{prd.price} EGp</p>
        <p>{prd.ratingsAverage}<i className='fa-solid fa-star' style={{color:"orange"}}></i></p>
        </div>
        </Link>
        <button onClick={()=>{addToMyCart(prd._id)}} className='btn btn-success w-100'>Add to cart</button>
        </div>
        </div>

      }) }   
      </>:

      <div className="d-flex vh-100 justify-content-center align-items-center ">
      <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      />
      </div>
    } 
    </div>
  )
}
    