import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Body from './component/Body.jsx'
import Search from './component/Header/Search.jsx'
import Offers from './component/Header/Offers.jsx'
import SignUp from './component/Header/SignUp.jsx'
import Cart from './component/Cart.jsx'
import Login from './component/Header/Login.jsx'
import Error from './component/Error.jsx'
 
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Body /> },   // ✅ Home only
      { path: "search", element: <Search /> },
      { path: "offer", element: <Offers /> },
      { path: "signup", element: <SignUp /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider  router={appRouter} ></RouterProvider>
)
 