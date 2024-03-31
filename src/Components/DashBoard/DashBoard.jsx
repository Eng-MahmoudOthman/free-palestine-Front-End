import React, { useContext } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import avatar from "../../Assets/images/profile 1.png"
import { UserContext } from '../../Context/UserContext.js'

export default function DashBoard() {

   const { moderator } = useContext( UserContext )

   return (
      <>
      
         <div className="container-fluid dashboard" >
            <div className="row">
               
               <div className="col-md-12 d-flex justify-content-between align-items-center bg-body-secondary">
                  <h1 className='h4'>Dashboard</h1>
                  <div className='imageDashBoard m-1'>
                     <img src={avatar} alt="avatar" className='w-100 h-100'  />
                  </div>
               </div>



               <div className="col-md-1  sidebar  m-0 ">

                  <ul class="nav justify-content-center">

                     <li class="nav-item my-2">
                        <Link class="nav-link " to={""}><i class="fa-solid fa-house iconBlock"></i> Home</Link>
                     </li>

                  {moderator? <></> : <>
                     <li class="nav-item my-2">
                        <Link class="nav-link" to={"dashboardUsers"}><i class="fa-solid fa-users iconBlock"></i> Users</Link>
                     </li>

                     <li class="nav-item my-2">
                        <Link class="nav-link" to={"companyAdminHome"}><i class="fa-solid fa-building iconBlock"></i> Company</Link>
                     </li>

                     <li class="nav-item my-2">
                        <Link class="nav-link" to={"categoriesAdminHome"}><i class="fa-solid fa-list iconBlock"></i>Category</Link>
                     </li>
                  </>}

                     <li class="nav-item my-2">
                        <Link class="nav-link" to={"dashboardProduct"}><i class="fa-brands fa-product-hunt iconBlock"></i> Products</Link>
                     </li>

                  </ul>

               </div>



               <div className="col-md-11">
                  <Outlet></Outlet>
               </div>


            </div>
         </div>
      
      </>
   )
}


{/* <i className="fa-brands  fa-facebook me-3"></i>
<i className="fa-brands  fa-twitter me-3"></i>
<i className="fa-brands  fa-telegram me-3"></i>
<i className="fa-brands  fa-Youtube"></i>
<i className="fa-brands  fa-instagram me-3"></i> */}