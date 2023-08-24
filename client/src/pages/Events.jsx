import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";

export default function Events() {
   const [events, setEvents] = useState([]);
   useEffect(() => {
      axios.get("/myevents").then(({ data }) => {
         setEvents(data);
      });
   }, []);

   return (
      <div>
         <AccountNav />

         <div className="text-center py-8">
            <Link
               className="bg-primary py-2 px-4 rounded-full mt-3 text-white inline-flex"
               to={"/account/myevents/new"}>
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
                     d="M12 4.5v15m7.5-7.5h-15"
                  />
               </svg>
               Add New Events
            </Link>
         </div>
         <div className="mt-4">
            {events.length > 0 &&
               events.map((event) => (
                  <Link
                     to={"/account/myevents/" + event._id}
                     className=" flex bg-gray-100 gap-4 p-4 rounded-2xl cursor-pointer">
                     <div className=" flex w-32 h-32 bg-gray-300 ">
                        {event.photos.length > 0 && (
                           <img
                              className="object-cover"
                              src={
                                 "http://localhost:4000/uploads/" +
                                 event.photos[0]
                              }
                              alt=""
                           />
                        )}
                     </div>
                     <div className="grow-0 shrink">
                        <h2 className="text-xl font-bold"> {event.title}</h2>
                        <p className="text-sm mt-2"> {event.address} </p>
                        <p>Team Size : {event.maxMembers} </p>
                     </div>
                  </Link>
               ))}
         </div>
      </div>
   );
}
