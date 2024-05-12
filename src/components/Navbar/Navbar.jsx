import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from './../../context/TokenContext';
import { cartContext } from '../../context/CartContext';

export default function Navbar() {
let{cartNumber,setcartNumber,getCart} = useContext(cartContext)
let navigate =  useNavigate()
  let  {userToken ,setuserToken}=  useContext(userContext)
  console.log(userToken)

  function Logout(){
    localStorage.removeItem('userToken')
    setuserToken(null)
    navigate('/signin')
  }
  useEffect(() => {
    (async () => {
      let data = await getCart();
      setcartNumber(data.data.numOfCartItems)
     
    })();
  }, []);
  return (
    <div>
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light"
    >
      <div className="container">
        <Link className="navbar-brand" href="#"><i className="fa-solid fa-cart-shopping text-success"></i>
      <span>  FreshCart</span></Link>
        
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
        {userToken!==null ?
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="product">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="category">Categaries</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="brands">Brands</Link>
            </li>
           
          </ul> :''}
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          {userToken==null?
            <>
            <li className="nav-item">
            <Link className="nav-link" to="signup">Register</Link>
          </li>
            <li className="nav-item">
              <Link className="nav-link" to="signin">Login</Link>
            </li>
           
            </>:''
          }
         
          {userToken!==null ?
            <>
            <li className="nav-item d-flex align-items-center">
          <i class="fa-brands fa-facebook mx-3"></i>
          <i class="fa-brands fa-instagram mx-3"></i>
          <i class="fa-brands fa-twitter mx-3"></i>
          <i class="fa-brands fa-linkedin mx-3"></i>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="cart">
          <i className="fa-solid fa-shopping-cart" style={{color:"green"}}></i>
          <span className='badge' style={{color:'white',background:'green'}}>{cartNumber}</span>
          </Link>
        </li>   
          <li onClick={()=>Logout()}  className="nav-item">
            <Link className="nav-link" >Logout</Link>
          </li>  
               
           </>:''

          }
          
        </ul>
        </div>

      
      </div>
    </nav>   
    </div>
  )
}
