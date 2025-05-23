import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Cart from './pages/cart'
import Checkout from './pages/Checkout'
import Success from './pages/success'
import Failed from './pages/failed'
const App = () => {
  return (
    <>
  <BrowserRouter>
  <Routes>
<Route path='/' element={<Layout/>} >
<Route index element={<Home/>} />
<Route path='/home' element={<Home/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/checkout' element={<Checkout/>}/>
<Route path='/success' element={<Success/>}/>
<Route path='/cancel' element={<Failed/>}/>

</Route>
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App