import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
const[isLoading , setisLoading] = useState(false)
const[errorMes , setErrorMes] = useState(null)
let navigate= useNavigate()
function validate(values){
  let errors = {}
  if(!values.name){
    errors.name= 'name is required'
  }else if(values.name.length < 3){
    errors.name = 'minlength 3 char'
  }else if(values.name.length > 8){
    errors.name = 'maxlength 8 char'
  }

  if(!values.phone){
    errors.phone = 'phone is required'
  }else if(!/^01[1250][0-9]{8}$/.test(values.phone)){
    errors.phone = 'enter valid phone number'
  }
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
  if (!values.rePassword) {
    errors.rePassword = ' repassword required';
  }else if(values.password !== values.rePassword){
    errors.rePassword = 'not matched'
  }

return errors
}

  async  function signUp(values){
    console.log(values)
   let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
   .catch((err)=>{
    setErrorMes(err.response.data.message)
   })
   console.log(response.data)
   navigate('/signin')
   setisLoading(true)
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone : ""
    },
    onSubmit:signUp ,
    validate ,
    
  });
  return (
    <div className="my-5 ">
      <h1
        className="text-center text-success my-5
    "
      >
        Register Now
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row gy-4 ">
          <div className="col-md-8 m-auto w-50 bg-light shadow p-5">
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="userName">Name</label>
                <input
                  type="text"
                  id="userName"
                  name="name"
                  className="form-control"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.errors.name && formik.touched.name ?
                <p className="text-danger">{formik.errors.name}</p>:''
                }
              </div>
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
                <label htmlFor="userPhone">Phone</label>
                <input
                  type="text"
                  id="userPhone"
                  name="phone"
                  className="form-control"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                ></input>
                {formik.errors.phone && formik.touched.phone ?
                  <p className="text-danger">{formik.errors.phone}</p>:''
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
              <div className="col-md-12">
                <label htmlFor="userConfirm">rePassword</label>
                <input
                  type="password"
                  id="userConfirm"
                  name="rePassword"
                  className="form-control"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                ></input>
                {formik.errors.rePassword && formik.touched.rePassword ?
                  <p className="text-danger">{formik.errors.rePassword}</p>:''
                  }
              </div>
              {errorMes!==null?<p className="text-danger">{errorMes}</p>:''}
              <div className="col-md-12">
                <button disabled={!(formik.dirty && formik.isValid)} type="submit" className="btn btn-success mt-2">Register
               {isLoading? <span>
                <i className="fa-solid fa-spinner fa-spin mx-3 "></i>
                </span>:''}
                </button>
                
              </div>
              <p>I hava account <Link to='/signin'>Login</Link></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
