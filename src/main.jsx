import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UpdateAddTodo from './pages/UpdateAddTodo'



const router = createBrowserRouter([
    {
      path: '/',
      element: <App />
    },
    {
      path: '/addtodo',
      element: <UpdateAddTodo />
    },
    {
      path: '/updatetodo',
      element: <UpdateAddTodo />
    },
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
