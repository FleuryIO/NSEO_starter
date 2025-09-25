// src/index.tsx
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import Root from './Root.jsx'

function ensureRoot() {
  const el = document.getElementById('root')
  if (!el) throw new Error('Root div not found')
  return el
}

createRoot(ensureRoot()).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)