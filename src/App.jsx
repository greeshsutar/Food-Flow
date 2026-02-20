import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";


const Header = React.lazy(() => import("./component/Header/Header.jsx"));
const Footer = React.lazy(() => import("./component/Footer.jsx"));

export default function App() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Header />
     
      <Outlet />
      <Footer />
    </Suspense>
  );
}
