<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import Navbar from '/src/Pages/Navbar'
import ProfilePage from '/src/Pages/Profilesection/ProfilePage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfilePage />
  </StrictMode>,
)
=======
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import  HomePage  from "./Pages/HomePage";  // Correct relative import
 // Import HomePage from the pages folder

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomePage />  {/* Render HomePage */}
  </StrictMode>
);
>>>>>>> ad0e88c (body content added)
