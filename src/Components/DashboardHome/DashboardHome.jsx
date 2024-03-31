import React, { useContext } from 'react'
import image  from "../../Assets/images/home,.gif"
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext.js'

export default function DashboardHome() {

   const {user , setUser , userToken , setUserToken , admin , setAdmin , moderator ,  setModerator , setProductSpecificUser} = useContext( UserContext )

   return (
      <>

         <div className='d-flex justify-content-between align-items-center m-1'>
            <div>
               <h1 className='h4 fw-bold main-color'>Dashboard Home</h1>
               <h3 className='admin-name'>{user.name?.split(" ").slice(0,2).join(" ")}</h3>
            </div>
            <div className='w-25 '>
               <img src={image} alt="product" className='w-100 head-image'/>
            </div>
         </div>

         <div className="row dashboardHome">

            <div className="col-md-4 col-4">
               <div className='m-1 '>
                  <Link to={"allProductsAdmin"}><button className='btn bg-color w-100'>All Products</button></Link>
               </div>
            </div>

            <div className="col-md-4 col-4">
               <div className='m-1'>
                  {/* <button className='btn bg-color w-100'>All Categories</button> */}
                  <Link to={"categoryAdmin"}><button className='btn bg-color w-100'>All Categories</button></Link>
               </div>
            </div>

            <div className="col-md-4 col-4">
               <div className='m-1'>
                  <Link to={"companyAdmin"}><button className='btn bg-color w-100'>All Companies</button></Link>
               </div>
            </div>

            <div className="col-md-4 col-4">
               <div className='m-1'>
                  <button className='btn bg-color w-100'>All Reports</button>
               </div>
            </div>

            <div className="col-md-4 col-4">
               <div className='m-1'>
                  <Link to={"activeProduct"}><button className='btn bg-color w-100'>All Active Products</button></Link>
               </div>
            </div>

            <div className="col-md-4 col-4">
               <div className='m-1'>
                  <Link to={"rejectedProducts"}><button className='btn bg-color w-100'>Rejected Products</button></Link>
               </div>
            </div>

            
         </div>

      </>
   )
}
