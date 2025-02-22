
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import Navbar from '/src/Pages/Navbar'
// import HomePage from './Pages/HomeSection/HomePage';
import App from "./App";




createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <HomePage/> */}
    <App/> 
  </StrictMode>,
)
