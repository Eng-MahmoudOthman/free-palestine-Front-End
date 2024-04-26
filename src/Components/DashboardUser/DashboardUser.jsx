import React, { useContext } from 'react'
import image  from "../../Assets/images/home3.gif"
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext.js'

export default function DashboardUser() {
   const {user , setUser , userToken , setUserToken , admin , setAdmin , moderator ,  setModerator , setProductSpecificUser} = useContext( UserContext )

   return (
      <>


         <div className='d-flex justify-content-between align-items-center m-1'>
            <div>
               <h1 className='h4 fw-bold main-color'>Dashboard User</h1>
               <h3 className='admin-name'>{user.name?.split(" ").slice(0,2).join(" ")}</h3>
            </div>
            <div className='w-25 '>
               <img src={image} alt="product" className='w-100 head-image'/>
            </div>
         </div>

         <div className="row dashboardUser">
            <div className="col-md-4 col-4">
               <div className='m-1 '>
                  <Link to={"/addUserAdmin"}><button className='btn btn-success w-100'>Add User</button></Link>
               </div>
            </div>
            <div className="col-md-4 col-4">
               <div className='m-1'>
                  <Link to={"/getAllUserAdmin"}><button className='btn btn-success w-100'>Get All User</button></Link>
               </div>
            </div>
            <div className="col-md-4 col-4">
               <div className='m-1'>
                  <button className='btn btn-success w-100'>All User Active</button>
               </div>
            </div>
            <div className="col-md-4 col-4">
               <div className='m-1'>
                  <button className='btn btn-info w-100'>Delete User</button>
               </div>
            </div>
            <div className="col-md-4 col-4">
               <div className='m-1'>
                  <button className='btn btn-danger w-100'>Update User</button>
               </div>
            </div>
            <div className="col-md-4 col-4">
               <div className='m-1'>
                  <button className='btn btn-primary w-100'>Bloch User</button>
               </div>
            </div>

         </div>
      
      </>
   )
}
