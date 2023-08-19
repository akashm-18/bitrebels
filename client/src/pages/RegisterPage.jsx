import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   async function RegisterUser(e) {
      e.preventDefault();
      try {
         await axios.post("/register", {
            name,
            email,
            password,
         });
         alert("Registration successfull.Now You can Login");
      } catch (e) {
         alert("Registration Failed.Please Try again Later");
      }
   }
   return (
      <div className="flex h-screen items-center justify-center">
         <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form
               className="max-w-md mx-auto space-y-4"
               onSubmit={RegisterUser}>
               <input
                  type="text"
                  placeholder="Akash"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <input
                  className="border rounded-lg px-4 py-2 w-full"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <input
                  className="border rounded-lg px-4 py-2 w-full"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <button
                  className="bg-primary  text-white rounded-lg px-4 py-2 w-full"
                  type="submit">
                  Register
               </button>
               <div className="text-center text-gray-500">
                  Already have Account ?
                  <span className="mx-3 underline md:underline-offset-4 text-black">
                     <Link to={"/login"}>Login</Link>
                  </span>
               </div>
            </form>
         </div>
      </div>
   );
}
