import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
const Checkout = () => {
  const [userdata,setuserdata]=useState({});
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const cart = useSelector(state => state.cart)
    const Product = useSelector(state => state.cart)
    const total=cart.reduce((total,item)=>total+item.price*item.quantity,0)
    const ans=cart.map((item)=>{
        return(
            <>
            <tr>
                <td><img src={item.image} alt="" height={40} /></td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                    {item.quantity}
                    </td>
                <td>{item.price*item.quantity}</td>
            </tr>
            </>
        )
    })


    const changeval=(e)=>{
     let name=e.target.name;
     let value=e.target.value;
    setuserdata({...userdata,[name]:value})
    }



    const stripePromise = loadStripe("pk_test_51ROvTIPDlUUAOd1uspYdME18DhdLFRx8F3MYVIGGDSWoISZbjl6dplIyaoVAauBKC8qvIM2N15AKsXlOjTRLaldk00pD2efmgF");
    const handlePay = async () => {
        try {
          if(!userdata.name || !userdata.address || !userdata.city  || !userdata.state || !userdata.pincode || !userdata.email){
            console.log(userdata);
            alert("fill all detail");
            return;
          }
          const stripe = await stripePromise;
          const api = "http://localhost:8000/stripe-payment";
      
          const formattedProduct = Product.map(item => ({
            name: item.title,
            price: item.price,        
            qnty: item.quantity,
            defaultImage: `${item.image}`,
          }));
      console.log(formattedProduct);
          const response = await axios.post(api, { Product:formattedProduct,User:userdata });
      
          const session = response.data;
          if (!session.id) {
            console.error("Stripe session not returned:", session);
            return;
          }
      
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
      
          if (result.error) {
            console.error("Stripe error:", result.error.message);
          }
        } catch (err) {
          console.error("Payment initiation failed:", err);
        }
      };

  return (
    <>
    <h1 style={{textAlign:"center",marginTop:"20px",marginBottom:"20px"}}>Checkout</h1>
<div className='checkout'>
 <Table striped bordered hover style={{width:"50%" ,marginLeft:"40px"}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Price</th>
          <th>

            Quantity
            </th>
        </tr>
      </thead>
      <tbody>
     {ans}
     <tr>
        <td colSpan={3}></td>
        <td>Total</td>
        <td>{total}</td>
     </tr>
      </tbody>
    </Table>

<div className='info' style={{marginLeft:"150px",padding:"20px",borderRadius:"20px"}}>
    <label htmlFor="">Enter Name </label>
<input type="text" name='name' onChange={changeval}   style={{borderRadius:"20px",border:"none",height:"40px"}} />
<label htmlFor="">Enter Email</label>  <input type="text" name='email' onChange={changeval}  style={{borderRadius:"20px",border:"none",height:"40px"}} />
<label htmlFor="">Enter Address</label> <input type="text" name='address' onChange={changeval}  style={{borderRadius:"20px",border:"none",height:"40px"}}   />
<label htmlFor="">Enter City</label> <input type="text" name='city' onChange={changeval}   style={{borderRadius:"20px",border:"none",height:"40px"}}  />
<label htmlFor="">Enter City</label> <input type="text"  name='state' onChange={changeval}   style={{borderRadius:"20px",border:"none",height:"40px"}}  />
<label htmlFor="">Enter Pincode</label> <input type="text" name='pincode' onChange={changeval}   style={{borderRadius:"20px",border:"none",height:"40px"}}   />
        <h4 align="center" style={{ color: "green", fontWeight: "bold" }}>
          Your Total Payable Amount  : {total}
        </h4>
        <div id="pay" style={{ textAlign: "center" }}>
          <Button onClick={handlePay}>Pay Now!</Button>
        </div>
</div>


</div>

  
    
    </>
  )
}

export default Checkout