import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Features from "../../Features";
import axios from "axios";

export default function Events() {
   const { action } = useParams();
   const [title, setTitle] = useState("");
   const [address, setAddress] = useState("");
   const [addedPhotos, setAddedPhotos] = useState([]);
   const [photoLink, setPhotoLink] = useState("");
   const [description, setDescription] = useState("");
   const [features, setFeatures] = useState([]);
   const [extraInfo, setExtraInfo] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [maxMembers, setMaxMembers] = useState(1);

   async function addPhotoByLink(e) {
      e.preventDefault();
      const { data: filename } = await axios.post("/upload-by-link", {
         link: photoLink,
      });
      setAddedPhotos((prev) => {
         return [...prev, filename];
      });
      setPhotoLink("");
   }

   return (
      <div>
         {action !== "new" && (
            <div className="text-center py-8">
               <Link
                  className="bg-primary py-2 px-4 rounded-full text-white inline-flex"
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
         )}
         <br />
         <br />
         {action === "new" && (
            <div>
               <form>
                  <h2 className="text-2xl mt-4 mb-2">Title</h2>
                  <input
                     type="text"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     placeholder="Title of the Event"
                  />

                  <h2 className="text-2xl mt-4 mb-2">Address</h2>
                  <input
                     type="text"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     placeholder="address"
                  />
                  <h2 className="text-2xl mt-4 mb-2">Photos</h2>
                  <div className="flex gap-2 mx-2">
                     <input
                        type="text"
                        value={photoLink}
                        onChange={(e) => setPhotoLink(e.target.value)}
                        placeholder="Add Using a Link....jpg file"
                     />
                     <button
                        onClick={addPhotoByLink}
                        className="bg-gray-200 px-4 rounded-2xl">
                        Add&nbsp;Photo
                     </button>
                  </div>
                  <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                     {addedPhotos.length > 0 &&
                        addedPhotos.map((link) => <div> {link} </div>)}
                     <button className="flex justify-center gap-2 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 ">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-8 h-8">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                           />
                        </svg>
                        Upload
                     </button>
                  </div>
                  <h2 className="text-2xl mt-4">Description</h2>
                  <textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
                  <h2 className="text-2xl mt-4">Features</h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mt-3">
                     <Features selected={features} onChange={setFeatures} />
                  </div>

                  <h2 className="text-2xl mt-4 ">Extra Info</h2>
                  <textarea
                     value={extraInfo}
                     onChange={(e) => setExtraInfo(e.target.value)}
                  />

                  <h2 className="text-2xl mt-4">Start Date and End Date</h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                     <div>
                        <h3 className="mt-2 -mb-1">Start Date</h3>
                        <input
                           type="text"
                           value={startDate}
                           onChange={(e) => setStartDate(e.target.value)}
                           placeholder="14"
                        />
                     </div>
                     <div>
                        <h3 className="mt-2 -mb-1">End Date</h3>
                        <input
                           type="text"
                           value={endDate}
                           onChange={(e) => setEndDate(e.target.value)}
                           placeholder="25"
                        />
                     </div>
                     <div className="ml-2">
                        <h3 className="mt-2 -mb-1">Maximum Team Members</h3>
                        <input
                           className="h-8 mt-1.5  rounded-xl"
                           type="number"
                           value={maxMembers}
                           onChange={(e) => setMaxMembers(e.target.value)}
                        />
                     </div>
                  </div>
                  <div>
                     <button className="primary my-4 ">Save</button>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
}
