import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ModalFormContextProvider from './contexts/modalFormContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ModalFormContextProvider>
    <App />
  </ModalFormContextProvider>,
)
