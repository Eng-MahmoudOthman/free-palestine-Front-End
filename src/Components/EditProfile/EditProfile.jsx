import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function EditProfile() {
   return (
      <>
      <div className="container editProfile">
         <h1 className='main-header'>Edit Information User</h1>

         <div className="row">

            <div className="col-12 m-0 p-0">
               <ul class="nav m-0 p-0 justify-content-center align-items-center flex-nowrap">

                     <li class="nav-item my-2">
                        <Link class="nav-link  main-color" to={"editImageProfile"}><i class="fa-solid fa-pen-to-square iconBlock"></i><span className="edit"> Edit Image Profile </span></Link>
                     </li>

                     <li class="nav-item my-2">
                        <Link class="nav-link main-color" to={""}><i class="fa-solid fa-user-secret iconBlock"></i><span className="edit"> Change Info User </span></Link>
                     </li>

                     <li class="nav-item my-2">
                        <Link class="nav-link main-color" to={"changePassword"}><i class="fa-solid fa-lock iconBlock"></i><span className="edit"> Change Password  </span></Link>
                     </li>

               </ul>
            </div>


            <div className="col-12 m-0 p-0">
               <Outlet></Outlet>
            </div>

         </div>
      </div>
      
      
      
      </>
   )
}
