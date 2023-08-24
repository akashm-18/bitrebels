import React, { useEffect, useState } from "react";
import Features from "../../Features";
import axios from "axios";
import PhotoUploader from "../PhotoUploader";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";

export default function EventsFormPage() {
   const { id } = useParams();
   const [title, setTitle] = useState("");
   const [address, setAddress] = useState("");
   const [addedPhotos, setAddedPhotos] = useState([]);
   const [description, setDescription] = useState("");
   const [features, setFeatures] = useState([]);
   const [extraInfo, setExtraInfo] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [year, setYear] = useState(0);
   const [maxMembers, setMaxMembers] = useState(1);
   const [price, setPrice] = useState(0);
   const [redirect, setRedirect] = useState(false);

   useEffect(() => {
      if (!id) {
         return;
      }
      axios.get("/myevents/" + id).then((res) => {
         const { data } = res;
         setTitle(data.title);
         setAddress(data.address);
         setAddedPhotos(data.photos);
         setDescription(data.description);
         setFeatures(data.features);
         setExtraInfo(data.extraInfo);
         setStartDate(data.startDate);
         setEndDate(data.endDate);
         setYear(data.year);
         setMaxMembers(data.maxMembers);
         setPrice(data.price);
      });
   }, [id]);

   async function saveEvent(e) {
      e.preventDefault();
      const eventData = {
         title,
         address,
         addedPhotos,
         description,
         features,
         extraInfo,
         startDate,
         endDate,
         year,
         maxMembers,
         price,
      };

      if (id) {
         //Update
         await axios.put("/myevents", {
            id,
            ...eventData,
         });
         setRedirect(true);
      } else {
         // New Event
         await axios.post("/myevents", eventData);
         setRedirect(true);
      }
   }

   if (redirect) {
      return <Navigate to={"/account/myevents"} />;
   }
   return (
      <div>
         <AccountNav />

         <form onSubmit={saveEvent}>
            <h2 className="text-2xl mt-4 mb-2">Title</h2>
            <input
               required
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Title of the Event"
            />

            <h2 className="text-2xl mt-4 mb-2">Address</h2>
            <input
               required
               type="text"
               value={address}
               onChange={(e) => setAddress(e.target.value)}
               placeholder="address"
            />
            <h2 className="text-2xl mt-4 mb-2">Photos</h2>
            <PhotoUploader
               addedPhotos={addedPhotos}
               onChange={setAddedPhotos}
            />
            <h2 className="text-2xl mt-12">Description</h2>
            <textarea
               required
               className="border-2 mt-5"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            />
            <h2 className="text-2xl mt-4">Features</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mt-3">
               <Features selected={features} onChange={setFeatures} />
            </div>

            <h2 className="text-2xl mt-4 ">Extra Info</h2>
            <textarea
               required
               value={extraInfo}
               onChange={(e) => setExtraInfo(e.target.value)}
            />

            <h2 className="text-2xl mt-4">Start Date and End Date</h2>
            <div className="grid grid-cols-2 md:grid-cols-4  gap-3">
               <div>
                  <h3 className="mt-2 -mb-1">Date</h3>
                  <input
                     required
                     type="text"
                     value={startDate}
                     onChange={(e) => setStartDate(e.target.value)}
                     placeholder="14"
                  />
               </div>
               <div>
                  <h3 className="mt-2 -mb-1">Month</h3>
                  <input
                     required
                     type="text"
                     value={endDate}
                     onChange={(e) => setEndDate(e.target.value)}
                     placeholder="25"
                  />
               </div>
               <div>
                  <h3 className="mt-2 -mb-1">Year</h3>
                  <input
                     required
                     type="text"
                     value={year}
                     onChange={(e) => setYear(e.target.value)}
                     placeholder="Ex : 2002"
                  />
               </div>
               <div className="ml-2">
                  <h3 className="mt-2 -mb-1">Maximum Team Members</h3>
                  <input
                     required
                     className="h-8 mt-1.5  rounded-xl border-2"
                     type="number"
                     value={maxMembers}
                     onChange={(e) => setMaxMembers(e.target.value)}
                  />
               </div>
               <div className="ml-2">
                  <h3 className="mt-2 -mb-1">Price</h3>
                  <input
                     className="h-8 mt-1.5  rounded-xl border-2"
                     type="number"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                  />
               </div>
            </div>
            <div>
               <button className="primary my-4 ">Save</button>
            </div>
         </form>
      </div>
   );
}
