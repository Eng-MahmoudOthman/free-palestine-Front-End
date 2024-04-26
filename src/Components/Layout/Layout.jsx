import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Offline, Online } from "react-detect-offline";
import { useState } from "react";

export default function Layout(){

   return (
      <>
         <Navbar/>

         <Outlet></Outlet>
         
         <Offline>
            <div className="network fixed-bottom text-danger">
               <i className="fa-solid fa-wifi p-1 "></i> Network Offline
            </div>
         </Offline>

         <Online>
            <div className="network fixed-bottom text-success">
               <i className="fa-solid fa-wifi p-1 "></i> Network Online
            </div>
         </Online>
         
         <Footer/>
      </>
   )
}