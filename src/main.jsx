import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Components/Routes/Routes.jsx';
import AuthProvider from './Components/Context/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
<QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
</QueryClientProvider>

  </StrictMode>,
)
