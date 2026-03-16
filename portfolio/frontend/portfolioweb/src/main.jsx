import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import CVPage from './CVPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  // adding the information in github add Routes for cv page crucial change adding cv also
  // 
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cv" element={<CVPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)