import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
   const [allEvents, setAllEvents] = useState([]);
   useEffect(() => {
      axios.get("/allevents").then((res) => {
         setAllEvents(res.data);
      });
   }, []);

   return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-x-6 gap-y-8 ">
         {allEvents.length > 0 &&
            allEvents.map((event) => (
               <Link to={"/event/" + event._id} className="bg-gray-200 ">
                  <div className="flex rounded-2xl mb-2 ">
                     {event.photos?.[0] && (
                        <img
                           className="rounded-2xl object-cover aspect-square overflow-hidden "
                           src={
                              "http://localhost:4000/uploads/" +
                              event.photos?.[0]
                           }
                           alt=""
                        />
                     )}
                  </div>
                  <h3 className="font-bold"> {event.address} </h3>
                  <h2 className="text-sm text-gray-500">{event.title}</h2>
                  <div className="mt-2">
                     <span className="font-bold">
                        Event Price - {event.price}
                     </span>
                  </div>
               </Link>
            ))}
      </div>
   );
}
