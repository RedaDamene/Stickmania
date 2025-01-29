import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './Router.tsx'
import Selection from './pages/Selection/Selection.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Selection />
  </StrictMode>,
)