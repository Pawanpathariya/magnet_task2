import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import {useSelector} from "react-redux"
import { addtoCart } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
const Home = () => {
    const [product,setproduct]=useState([]);
  const dispatch=useDispatch();
  const cart=useSelector(state=>state.cart.value)
    const loadData=async()=>{
        let api ="https://fakestoreapi.com/products";
        const response= await axios.get(api);
        setproduct(response.data);
    }

    useEffect(()=>{
     loadData();
    },[])

const ans=product.map((item)=>{
    return(
        <>
        <div className='card1' style={{width:"300px",margin:"20px",padding:"20px",borderRadius:"20px",backgroundColor:"rgb(235, 243, 243)" }}>
    <div>
  <img src={item.image} alt="" height={250} width={250} />
    </div>
            <div style={{height:"250px"}}>
            <h4 style={{color:"blue"}}>Name : {item.title} </h4>  
            <p> <b>Category :</b>  {item.category}</p>
            {/* <p>Description : {item.description}</p> */}
            <p><b> Price :</b> {item.price}</p>
            </div>    

               <Button variant="primary" onClick={()=>{ dispatch(addtoCart({...item,quantity:1}))}} >Add to Cart</Button>  
        </div>
        
        </>
    )
})

  return (
   <>
   <div className='container'>
    <h3 style={{textAlign:"center",marginTop:"10px",color:"blue"}} >Products</h3>
<div className='cardcont'>
{ans}

</div>
   </div>
   </>
  )
}

export default Home