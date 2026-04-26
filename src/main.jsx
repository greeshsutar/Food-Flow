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
import OtpVerification from './component/OtpVerification.jsx';
import Checkout from './component/Header/Checkout.jsx';
import PaymentSuccessful from './component/Header/PaymentSuccessful.jsx';

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
      { path: "/clock", element: <Clock /> }, // ✅ moved up, comma fixed

      {
        path: "/cart",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><Cart /></Suspense>
      },
      {
        path: "/login",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><Login /></Suspense>
      },
      {
        path: "/RestraurentCard/:id",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><Menu /></Suspense>
      },
      {
        path: "/profile",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><Profile /></Suspense>
      },
      {
        path: "/forgot-password",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><ForgotPassword /></Suspense>
      },
      {
        path: "/about",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><About /></Suspense>
      },
      {
        path: "/privacy",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><Privacy /></Suspense>
      },
      {
        path: "/term",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><Terms /></Suspense>
      },
      {
        path: "/contact",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><Contact /></Suspense>
      },
      {
        path: "/signup-otp", // ✅ this must match navigate("/signup-otp") in SignUp.jsx
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><OtpVerification/></Suspense>
      },
      {
        path: "/checkout",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><Checkout /></Suspense>
      },
      {
        path: "/payment-successful",
        element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div></div>}><PaymentSuccessful/></Suspense>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);
