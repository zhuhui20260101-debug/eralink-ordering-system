import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// @AI-Context: 必须加上 basename，否则部署到 GitHub Pages 上会导致路由 404
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/eralink-ordering-system">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
