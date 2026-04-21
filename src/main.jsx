import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from "react";
import './index.css'
import App from './App.jsx'
import Body from './component/Body.jsx'
import Offers from './component/Header/Offers.jsx'
import SignUp from './component/Header/SignUp.jsx'
import Error from './component/Error.jsx'
import Clock from './component/Clock.jsx'
import appStore from './component/utils/appStore.js'
import { Provider } from "react-redux";
import About from './component/Footer/About.jsx';
import Privacy from './component/Footer/Privacy.jsx';
import Terms from './component/Footer/Term.jsx';
import Contact from './component/Footer/Contact.jsx';

//  Lazy loaded components
const Cart = lazy(() => import('./component/Cart.jsx'));
const Login = lazy(() => import('./component/Header/Login.jsx'));
const Menu = lazy(() => import('./component/Menu.jsx'));
const Profile = lazy(() => import('./component/Header/Profile.jsx'));
const ForgotPassword = lazy(() => import('./component/Header/ForgetPassword.jsx'));


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Body /> },   
      { path: "/offer", element: <Offers /> },
      { path: "/signup", element: <SignUp /> },

      //  Wrap lazy routes with Suspense
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h2>Loading Cart...</h2>}>
            <Cart />
          </Suspense>
        )
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<h2>Loading Login...</h2>}>
            <Login />
          </Suspense>
        )
      },
      {
        path: "/RestraurentCard/:id",
        element: (
          <Suspense fallback={<h2>Loading Menu...</h2>}>
            <Menu />
          </Suspense>
        )
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<h2>Loading Profile...</h2>}>
            <Profile />
          </Suspense>
        )
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <ForgotPassword />
          </Suspense>
        )
      },
       {
        path: "/about",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <About/>
          </Suspense>
        )
      },
        {
        path: "/privacy",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Privacy/>
          </Suspense>
        )
      },
        {
        path: "/term",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Terms/>
          </Suspense>
        )
      },
        {
        path: "/contact",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Contact/>
          </Suspense>
        )
      },
      { path: "/clock", element: <Clock /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);