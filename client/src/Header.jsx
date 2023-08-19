import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
   const { user } = useContext(UserContext);
   return (
      <div>
         <header className="flex justify-between p-4">
            <Link to="/" className="flex items-center gap-1">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
               </svg>

               <span className="font-bold text-xl">REBELS</span>
            </Link>
            <div className="flex border gap-10 border-gray-300 rounded-full py-2 px-8 shadow-md shadow-gray-300">
               <div>All</div>
               <div className="border-l border-gray-300"></div>
               <div>Recommended</div>
               <div className="border-l border-gray-300"></div>
               <div>Upcoming</div>
               <button className="bg-primary text-white p-1 rounded-full">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-4 w-4"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth={2}>
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                     />
                  </svg>
               </button>
            </div>
            <Link
               to={user ? "/account" : "/login"}
               className="flex border gap-2 border-gray-300 rounded-full py-2 px-4 items-center">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M4 6h16M4 12h16M4 18h16"
                  />
               </svg>
               <div className="bg-gray-500 text-white border border-gray-500 rounded-full overflow-hidden">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 relative top-1"
                     viewBox="0 0 20 20"
                     fill="currentColor">
                     <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                     />
                  </svg>
               </div>
               {!!user && <div> {user.name} </div>}
            </Link>
         </header>
      </div>
   );
}
