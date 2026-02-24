
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
import Menu from './component/Menu.jsx'
import RestraurentCard from './component/RestraurentCard.jsx'
import Clock from './component/Clock.jsx'
import appStore from './component/utils/appStore.js'
 import { Provider } from "react-redux";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Body /> },   
      { path: "/search", element: <Search /> },
      { path: "/offer", element: <Offers /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      {path:"/RestraurentCard/:id",element:<Menu/>},
      {path:"/clock",element:<Clock/>}
    
      
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
)
 