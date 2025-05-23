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
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand as={Link} to="/home" >Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/home"  >Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Container>
    {length} <FaShoppingCart style={{marginRight:"20px"}} onClick={()=>{
  navigate('/cart')
    }} />
  </Navbar>
  )
}

export default Topbar