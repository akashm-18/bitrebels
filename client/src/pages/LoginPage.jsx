import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [redirect, setRedirect] = useState(false);
   const { setUser } = useContext(UserContext);
   async function handleLoginSubmit(e) {
      e.preventDefault();
      try {
         const { data } = await axios.post("/login", { email, password });
         setUser(data);
         alert("Login SuccessFull");
         setRedirect(true);
      } catch (e) {
         alert("Login Failed");
      }
   }
   if (redirect) {
      return <Navigate to={"/"} />;
   }
   return (
      <div className="flex h-screen items-center justify-center">
         <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form
               className="max-w-md mx-auto space-y-4"
               onSubmit={handleLoginSubmit}>
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
                  Login
               </button>
               <div className="text-center text-gray-500">
                  Don't have account yet ?
                  <span className="mx-3 underline md:underline-offset-4 text-black">
                     <Link to={"/register"}>Register now</Link>
                  </span>
               </div>
            </form>
         </div>
      </div>
   );
}
