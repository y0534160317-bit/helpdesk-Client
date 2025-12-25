import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import protectedRoute from './routs/protectedRoute.tsx'
import { AuthProvider } from './features/auth/loginLogic.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider >
      <RouterProvider router={protectedRoute} />
    </AuthProvider>
  </StrictMode>,
)




