import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ReasetPassword() {
  let navigate = useNavigate()
   async function ResetPassword(values){
    let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
    console.log(data)
    if(data.token){
      navigate('/signin')

    }

  }
  let formik = useFormik({
    initialValues :{
      email:"",
    newPassword :''
    },
    onSubmit:ResetPassword
  })
  return (
    <div>
    <form onSubmit={formik.handleSubmit}  className='w-75 mx-auto my-5'>
    <label className='my-3'>Email:</label>
    <input  type='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name='email' className='form-control'/>
    <label className='my-3'>newPassword:</label>
    <input  type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} id='newPassword' name='newPassword' className='form-control'/>
    <button className='btn btn-success my-3'>Reset Password</button>
    </form>
      
    </div>
  )
}
