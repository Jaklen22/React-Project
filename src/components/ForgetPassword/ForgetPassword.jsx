import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgetPassword() {
  let validationShema = Yup.object({
    email : Yup.string().required("email is required").email("enter valid email")
  })
 async function sendcode(values){
  let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
  console.log(data)
    if(data.statusMsg ==='success'){
       document.querySelector('.forgotpassword').classList.add('d-none')
       document.querySelector('.verfiycode').classList.remove('d-none')

    }
  }
let formik=useFormik({
  initialValues:{
    email:''
  },
  validationSchema : validationShema ,
  onSubmit : sendcode
  })

  let validationShema2 = Yup.object({
    resetCode : Yup.string().required("code is required")
  })

  
  let navigate = useNavigate()
 async function sendData(values){
  let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
  console.log(data)
    if(data.status ==='Success'){
      navigate('/resetpassword')
      
    }
  }
let verfiyformik=useFormik({
  initialValues:{
    resetCode:''
  },
  validationSchema : validationShema2 ,
  onSubmit : sendData
  })
  return (
  <>
  <div className='forgotpassword'>
  <h3 className='m-3'>Forgot Password ?</h3>
    <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'>
    <label className='my-3'>Email:</label>
    <input onBlur={formik.handleBlur} type='email' value={formik.values.email} onChange={formik.handleChange} id='email' name='email' className='form-control'/>
    {formik.touched.email&& formik.errors.email ?<p className='text-danger'>{formik.errors.email}</p>:''}
    <button disabled={!(formik.isValid&&formik.dirty)}  type='submit'  className='btn btn-success my-3'>Send Code</button>
    </form>
  </div>
  <div className='verfiycode d-none'>
  <h3 className='m-3'>Verify Code</h3>
    <form onSubmit={verfiyformik.handleSubmit} className='w-75 mx-auto my-5'>
    <label className='my-3'>resetCode:</label>
    <input onBlur={verfiyformik.handleBlur} type='text' value={verfiyformik.values.resetCode} onChange={verfiyformik.handleChange} id='resetCode' name='resetCode' className='form-control'/>
    {verfiyformik.touched.resetCode&& verfiyformik.errors.resetCode ?<p className='text-danger'>{verfiyformik.errors.resetCode}</p>:''}
    <button disabled={!(verfiyformik.isValid&&verfiyformik.dirty)}  type='submit'  className='btn btn-success my-3'>Send Code</button>
    </form>
  </div>
  </>
  )
}
