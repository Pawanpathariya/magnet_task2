import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import {Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const navigate=useNavigate();
  const cart=useSelector(state=>state.cart)
  const length=cart.length;
  return (
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand as={Link} to="/home" >The Shop</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/home"  >Home</Nav.Link>
      </Nav>
    </Container>
    <p style={{fontSize:"20px",paddingTop:"7px"}}>   {length} <FaShoppingCart style={{marginRight:"20px"}} onClick={()=>{
  navigate('/cart')
    }} /></p>
 
  </Navbar>
  )
}

export default Topbar