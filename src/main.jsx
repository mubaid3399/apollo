import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'phosphor-icons/src/css/icons.css'
import './index.css'
import App from './App.jsx'

// Dynamically support /home/ subfolder or root domain seamlessly
const getBasename = () => {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/home')) {
    return '/home'
  }
  return ''
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
