import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ModalFormContextProvider from './contexts/modalFormContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContextProvider } from './contexts/toastContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ToastContextProvider>
      <ModalFormContextProvider>
        <App />
      </ModalFormContextProvider>
    </ToastContextProvider>
  </ QueryClientProvider>,
)
