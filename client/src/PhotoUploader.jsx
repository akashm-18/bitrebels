import React, { useState } from "react";
import axios from "axios";

export default function PhotoUploader({ addedPhotos, onChange }) {
   const [photoLink, setPhotoLink] = useState("");

   async function addPhotoByLink(e) {
      e.preventDefault();
      const { data: filename } = await axios.post("/upload-by-link", {
         link: photoLink,
      });
      onChange((prev) => {
         return [...prev, filename];
      });
      setPhotoLink("");
   }

   function uploadPhoto(e) {
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
         data.append("photos", files[i]);
      }
      axios
         .post("/upload", data, {
            headers: { "Content-Type": "multipart/form-data" },
         })
         .then((res) => {
            const { data: filenames } = res;
            onChange((prev) => {
               return [...prev, ...filenames];
            });
         });
   }

   return (
      <div>
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
         <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 &&
               addedPhotos.map((link) => (
                  <div className="h-32 flex" key={link}>
                     <img
                        className="rounded-2xl h-full mt-5 w-full object-cover"
                        src={"http://localhost:4000/uploads/" + link}
                        alt=""
                     />
                  </div>
               ))}
            <label className=" h-32 cursor-pointer mt-8 items-center flex justify-center gap-2 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 ">
               <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
               />
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 ">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
               </svg>
               Upload
            </label>
         </div>
      </div>
   );
}
