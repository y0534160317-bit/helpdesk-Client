import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import protectedRoute from './routs/protectedRoute.tsx'
import { AuthProvider } from './features/auth/loginLogic.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={protectedRoute} />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)




