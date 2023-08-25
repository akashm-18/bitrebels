import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function RegisterEvent({ singleEvent }) {
   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [redirect, setRedirect] = useState("");

   async function registerthisEvent() {
      const res = await axios.post("/registerevent", {
         event: singleEvent._id,
         name,
         phone,
         price: singleEvent.price,
         date: singleEvent.startDate,
         month: singleEvent.endDate,
         year: singleEvent.year,
      });

      // eventId , date , month , year , name , phone , price

      const eventId = res.data._id;
      setRedirect(`/account/registrations/${eventId}`);
   }

   if (redirect) {
      return <Navigate to={redirect} />;
   }

   return (
      <div className="my-7">
         <div className="ml-5 mt-2.5 bg-white shadow p-4 rounded-2xl">
            <h1 className="font-semibold text-xl text-center">
               Register the event
            </h1>
            <div className="my-2 rounded-2xl">
               <input disabled type="text" value={singleEvent.title} />
            </div>
            <h3 className="p-3 border rounded-xl mt-4">
               {" "}
               Price : {singleEvent.price}
            </h3>
            <div className="mx-2 mt-4 mb-2">Date-Month-Year</div>
            <div className="flex gap-2">
               <h1 className="flex overflow-hidden">
                  <input disabled type="text" value={singleEvent.startDate} />
               </h1>
               <h1>
                  {" "}
                  <input disabled type="text" value={singleEvent.endDate} />
               </h1>
               <input disabled type="text" value={singleEvent.year} />
            </div>

            <div className="bg-white shadow my-4 p-2 rounded-2xl">
               <h1> Team Size : {singleEvent.maxMembers} </h1>
            </div>
            <div>
               <div className="my-3">
                  <h1 className="my-2">Enter Your Team Name</h1>
                  <input
                     required
                     type="text"
                     placeholder="Team Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>

               <div className="my-3">
                  <h1 className="my-2">Enter Your Phone Number</h1>
                  <input
                     required
                     type="text"
                     placeholder="Active Mobile Number"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                  />
               </div>

               <button onClick={registerthisEvent} className="primary my-4">
                  Register
               </button>
            </div>
         </div>
      </div>
   );
}
