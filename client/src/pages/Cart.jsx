import React from 'react'
import {useSelector} from "react-redux"
import { increaseQuantity,decreaseQuantity ,removeFromCart} from '../redux/cartSlice'
import { useDispatch } from 'react-redux'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
const Cart = () => {
    const navigate=useNavigate();
      const dispatch=useDispatch();
      const cart=useSelector(state=>state.cart)
      const total=cart.reduce((total,item)=>total+item.price*item.quantity,0)

      const ans=cart.map((item)=>{
        return(
            <>
            <tr>
         <td> <img src={item.image} alt="" width={80} height={80} /> </td>
         <td>{item.title}</td>
         <td style={{width:"400px"}}>{item.description}</td>
         <td>{item.price}</td>
         <td>
         <Button variant="primary" onClick={()=>{
                dispatch(increaseQuantity(item.id))
            }} >+</Button>
            {item.quantity}  
            <Button variant="secondary" onClick={()=>{
                dispatch(decreaseQuantity(item.id))
            }} >-</Button>
         </td>

<td>
    {item.quantity*item.price}
</td>
<td>
<Button variant="danger" onClick={()=>{
                dispatch(removeFromCart(item.id))
            }} >Remove</Button>
</td>
            </tr>
            </>
        )
      })
  return (
  <div>
    <Table striped bordered hover variant="light" style={{marginTop:"30px"}}>
      <thead>
      <tr>
   <th></th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th></th>
   </tr>
      </thead>
      <tbody>
      {ans}

      <tr>
    <td colSpan={4}></td>
    <td> <b>Total</b> </td>
    <td> <b>{total}</b> </td>
   </tr>
      </tbody>
    </Table>

    <p style={{textAlign:"center"}}><Button variant="success" onClick={()=>{navigate('/checkout')}} >Checkout</Button></p>



  </div>
  )
}

export default Cart