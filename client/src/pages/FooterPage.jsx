import React from "react";

const Footer = () => {
   return (
      <footer className="bg-gray-900 text-white text-center py-4  relative bottom-0 w-full ">
         <div className="container mx-auto flex justify-between items-center px-4">
            <div className="text-left">
               <h3 className="text-lg font-semibold">Contact Us</h3>
               <p>Email: contact@example.com</p>
               <p>Phone: +123-456-7890</p>
            </div>
            <div className="flex flex-col items-end">
               <div className="flex gap-4">
                  <a
                     href="#"
                     className="text-white text-xl hover:text-gray-400">
                     <i className="fab fa-facebook"></i>
                  </a>
                  <a
                     href="#"
                     className="text-white text-xl hover:text-gray-400">
                     <i className="fab fa-twitter"></i>
                  </a>
                  <a
                     href="#"
                     className="text-white text-xl hover:text-gray-400">
                     <i className="fab fa-instagram"></i>
                  </a>
               </div>
               <p className="mt-2">
                  &copy; 2023 Your Website. All rights reserved.
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
