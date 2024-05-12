import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from './../../context/CartContext';

export default function CheckOut() {
  let{ckeckoutPayment ,getCart}=useContext(cartContext)
  const[isLoading , setisLoading] = useState(false)
  const[cartId ,setcartId] = useState('')

  useEffect(() => {
    (async () => {
      let data = await getCart();
      setcartId(data.data.data._id)
      
    })();
  }, []);
  
  async  function payment(values){

  let data =await ckeckoutPayment(cartId,values)
     if(data.data.status==='success'){
      window.location = data.data.session.url

     }
  }
  const formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone:""
     
    },
    onSubmit:payment ,

    
  });
  return (
    <div className="my-5 ">
      <h1
        className="text-center text-success my-5
    "
      >
        Payment Form
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row gy-4 ">
          <div className="col-md-8 m-auto w-50 bg-light shadow p-5">
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="userEmail">Details</label>
                <input
                  type="text"
                  id="userEmail"
                  name="details"
                  className="form-control"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                ></input>
               
              </div>
           
              <div className="col-md-12">
                <label htmlFor="urCity">City</label>
                <input
                  type="text"
                  id="urCity"
                  name="city"
                  className="form-control"
                  value={formik.values.city}
                  onChange={formik.handleChange}

                ></input>
              </div>
              <div className="col-md-12">
                <label htmlFor="urPhone">Phone</label>
                <input
                  type="tel"
                  id="urPhone"
                  name="phone"
                  className="form-control"
                  value={formik.values.phone}
                  onChange={formik.handleChange}

                ></input>
              </div>
              <div className="col-md-12">
                <button type="submit" className="btn btn-success mt-2">Pay
               {isLoading? <span>
                <i className="fa-solid fa-spinner fa-spin mx-3 "></i>
                </span>:''}
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}