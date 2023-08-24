import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";

export default function RegisteredEvents() {
   const [allregisterevents, setAllRegisterevents] = useState([]);
   useEffect(() => {
      axios.get("/registerevent").then((res) => {
         setAllRegisterevents(res.data);
      });
   }, []);
   return (
      <div>
         <AccountNav />
         <div>
            {allregisterevents?.length > 0 &&
               allregisterevents.map((event) => <div> {event.address} </div>)}
         </div>
      </div>
   );
}
