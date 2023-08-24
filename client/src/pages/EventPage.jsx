import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RegisterEvent from "../RegisterEvent";

export default function EventPage() {
   const { id } = useParams();
   const [singleEvent, setSingleEvent] = useState(null);
   useEffect(() => {
      if (!id) {
         return;
      }
      axios.get("/event/" + id).then((res) => {
         setSingleEvent(res.data);
      });
   }, [id]);

   if (!singleEvent) return "";

   return (
      <div className="mt-6 bg-gray-100 -mx-8 px-8 pt-8">
         <h1 className="text-4xl"> {singleEvent.title} </h1>
         <a
            className="flex gap-2 font-semibold underline my-3"
            target="_blank"
            href={"https://maps.google.com/?q=" + singleEvent.address}>
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
               />
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
               />
            </svg>
            {singleEvent.address}
         </a>
         <div className="grid gap-2 grid-cols-1 lg:grid-cols-[1fr_1fr] object-cover">
            <div>
               {singleEvent.photos?.[0] && (
                  <div>
                     <img
                        className="h-full w-full object-cover rounded-xl"
                        src={
                           "http://localhost:4000/uploads/" +
                           singleEvent.photos[0]
                        }
                        alt=""
                     />
                  </div>
               )}
            </div>
            <div className="grid grid-cols-1 ">
               <div className="ml-5 mt-6">
                  <h1 className="text-2xl font-semibold mb-4">Description</h1>
                  <h3> {singleEvent.description} </h3>
                  <div className=" p-3 mt-6 rounded-2xl">
                     <h1 className=" text-2xl font-semibold">Details</h1>
                     <h1 className="my-2">
                        Event Fee :
                        <span className="font-semibold">
                           {" "}
                           {singleEvent.price}
                        </span>{" "}
                     </h1>
                     <h1 className="my-2">
                        Maximum Members :
                        <span className="font-semibold mx-2">
                           {singleEvent.maxMembers}{" "}
                        </span>
                     </h1>
                     <h1 className="my-2">
                        Event Date :{" "}
                        <span className="font-semibold">
                           {singleEvent.startDate}-{singleEvent.endDate}-
                           {singleEvent.year}
                        </span>
                     </h1>
                     <h1 className="my-2">
                        Event Location :{" "}
                        <span className="font-semibold">
                           {singleEvent.address}{" "}
                        </span>
                     </h1>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid gap-2 grid-cols-1 md:grid-cols-2 my-10 border-t">
            <div className="my-10">
               <div className=" p-3 rounded-2xl">
                  <h2 className="font-semibold text-2xl mb-2">Extra Info</h2>
                  <h3>{singleEvent.extraInfo}</h3>
               </div>
               <div className="mt-8">
                  <h3 className="my-4 text-2xl font-semibold">
                     Features Availble
                  </h3>
                  {singleEvent.features}
               </div>
            </div>
            <RegisterEvent singleEvent={singleEvent} />
         </div>
      </div>
   );
}
