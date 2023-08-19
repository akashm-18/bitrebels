import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./pages/FooterPage";

export default function Layout() {
   return (
      <div className="flex flex-col">
         <Header />
         <Outlet />
         {/* <Footer /> */}
      </div>
   );
}
