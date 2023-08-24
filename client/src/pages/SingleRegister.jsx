import React from "react";
import { useParams } from "react-router-dom";

export default function SingleRegister() {
   const { id } = useParams();
   return <div>Single Booking Page :{id} </div>;
}
