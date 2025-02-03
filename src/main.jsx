
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import Navbar from '/src/Pages/Navbar'
import ProfilePage from '/src/Pages/Profilesection/ProfilePage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfilePage />
  </StrictMode>,
)
