import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from './../../context/TokenContext';

export default function Signin() {
let  {userToken, setuserToken}=  useContext(userContext)

const[isLoading , setisLoading] = useState(false)
const[errorMes , setErrorMes] = useState(null)
let navigate= useNavigate()
function validate(values){
  let errors = {}
  if(!values.email){
    errors.email = 'email is required'
  }else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = ' password required';
  }else if(!/^[A-Z][a-z0-9]{6,8}$/.test(values.password)){
    errors.password= 'password invalid'
  }

return errors
}

  async  function signin(values){
    console.log(values)
   let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
   .catch((err)=>{
    setErrorMes(err.response.data.message)
   })
   console.log(response.data)
   navigate('/home')
   localStorage.setItem("userToken",response.data.token)
   setuserToken(response.data.token)
   console.log(userToken)
   setisLoading(true)
  }
  const formik = useFormik({
    initialValues: {
    
      email: "",
      password: "",
     
    },
    onSubmit:signin ,
    validate ,
    
  });
  return (
    <div className="my-5 ">
      <h1
        className="text-center text-success my-5
    "
      >
        Login Form
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row gy-4 ">
          <div className="col-md-8 m-auto w-50 bg-light shadow p-5">
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="userEmail">Email</label>
                <input
                  type="email"
                  id="userEmail"
                  name="email"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                ></input>
                {formik.errors.email&& formik.touched.email?
                  <p className="text-danger">{formik.errors.email}</p>:''
                  }
              </div>
           
              <div className="col-md-12">
                <label htmlFor="userPassword">Password</label>
                <input
                  type="password"
                  id="userPassword"
                  name="password"
                  className="form-control"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                ></input>
                {formik.errors.password && formik.touched.password ?
                  <p className="text-danger">{formik.errors.password}</p>:''
                  }
              </div>
             
              {errorMes!==null?<p className="text-danger">{errorMes}</p>:''}
              <div className="col-md-12">
                <button disabled={!(formik.dirty && formik.isValid)} type="submit" className="btn btn-success mt-2">Login
               {isLoading? <span>
                <i className="fa-solid fa-spinner fa-spin mx-3 "></i>
                </span>:''}
                </button>
                
              </div>
              <p>I don't hava account <Link to='/signup'>Register</Link></p>
              <p>ForgotPassword <Link to='/forgetpassword'>ResetPassword</Link></p>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
