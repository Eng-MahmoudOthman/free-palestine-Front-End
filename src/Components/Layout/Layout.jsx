import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Offline, Online } from "react-detect-offline";
import { useState } from "react";

export default function Layout(){

   return (
      <>
         <Navbar/>
         <div className="fixed-top btn-div-back">
            <button className="btn btn-success m-1 opacity-50" onClick={()=>{window.history.back()}}> <i class="fa-solid fa-left-long"></i></button>
            <button className="btn btn-success m-1 opacity-50" onClick={()=>{window.history.forward()}}><i class="fa-solid fa-right-long"> </i></button>
         </div>

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