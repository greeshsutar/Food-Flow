import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Header = React.lazy(() => import("./component/Header/Header.jsx"));
const Footer = React.lazy(() => import("./component/Footer/Footer.jsx"));

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <Suspense fallback={<h2>Loading Header...</h2>}>
        <Header />
      </Suspense>

      {/*THIS IS IMPORTANT */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Suspense fallback={<h2>Loading Footer...</h2>}>
        <Footer />
      </Suspense>

    </div>
  );
}