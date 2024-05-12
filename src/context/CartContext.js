import axios from "axios";
import { createContext, useState } from "react";

export let cartContext =  createContext()

export default function CartContextProvider(props){
    const [cartNumber ,setcartNumber] = useState(0)
    let baseUrl = 'https://ecommerce.routemisr.com'
    let header = {
        token:localStorage.getItem("userToken")
    }
function addToCart(id){
return  axios.post(`${baseUrl}/api/v1/cart`,{
productId:id
},{
    headers:header

})
}

function getCart(){
    return  axios.get(`${baseUrl}/api/v1/cart`,{
        headers:header
    
    })
    }

    function updateCart(id,count){
        return  axios.put(`${baseUrl}/api/v1/cart/${id}`,{
            count : count
   
        },{
            headers:header
        
        })
        } 

        function deleteCart(id){
            return  axios.delete(`${baseUrl}/api/v1/cart/${id}`,
           {
                headers:header
            
            })
            } 
            
  function  ckeckoutPayment(id,formData){
    return  axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
    {
       shippingAddress:formData
    },
    {
         headers:header
     
     })

    }        

    return <cartContext.Provider value={{addToCart , setcartNumber ,cartNumber ,getCart ,deleteCart,updateCart,ckeckoutPayment}}>
    {props.children}
    </cartContext.Provider>
}