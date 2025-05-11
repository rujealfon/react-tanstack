import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Import global styles
import './styles/global.css'

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
