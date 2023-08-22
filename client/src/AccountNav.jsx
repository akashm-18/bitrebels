import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AccountNav() {
   const { pathname } = useLocation();
   let subpage = pathname.split("/")?.[2];
   if (subpage == undefined) {
      subpage = "profile";
   }

   function linkclasses(type = null) {
      let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
      if (type === subpage) {
         classes += " bg-primary text-white";
      } else {
         classes += " bg-gray-200";
      }
      return classes;
   }

   return (
      <div>
         <nav className="w-full flex justify-center mt-8 gap-3  ">
            <Link className={linkclasses("profile")} to="/account">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mx-2">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
               </svg>
               My Profile
            </Link>
            <Link
               className={linkclasses("registrations")}
               to="/account/registrations">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mx-2">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
               </svg>
               My Registrations
            </Link>
            <Link className={linkclasses("myevents")} to="/account/myevents">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mx-2">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
                  />
               </svg>
               My Events
            </Link>
         </nav>
      </div>
   );
}
