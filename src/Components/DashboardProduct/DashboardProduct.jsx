import React, { useContext } from 'react'
import image  from "../../Assets/images/home2.gif"
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext.js'

export default function DashboardProduct() {
   const {user , setUser , userToken , setUserToken , admin , setAdmin , moderator ,  setModerator , setProductSpecificUser} = useContext( UserContext )

   return (
      <>
         <div className='d-flex justify-content-between align-items-center m-1'>
            <div>
               <h1 className='h4 fw-bold main-color'>Dashboard Products</h1>
               <h3 className='admin-name'>{user.name?.split(" ").slice(0,2).join(" ")}</h3>
            </div>
            <div className='w-25 '>
               <img src={image} alt="product" className='w-100 head-image'/>
            </div>
         </div>

         <div className="row dashboardProduct">

            
            <div className="col-md-4 col-4">
               <Link to={"/addProduct"}>
                  <div className='m-1'>
                     <button className='btn btn-success w-100'>Add Product</button>
                  </div>
               </Link>
            </div>


            <div className="col-md-4 col-4">
               <Link to={"/getAllProductsAdmin"}>
                  <div className='m-1'>
                     <button className='btn btn-info w-100'>All Products</button>
                  </div>
               </Link>
            </div> 


            <div className="col-md-4 col-4">
               <Link to={"#"}>
                  <div className='m-1'>
                     <button className='btn btn-success w-100'>All Product Active</button>
                  </div>
               </Link>
            </div>


            <div className="col-md-4 col-4">
               <Link to={"#"}>
                  <div className='m-1'>
                     <button className='btn btn-success w-100'>All Product Not Active</button>
                  </div>
               </Link>
            </div>


            <div className="col-md-4 col-4">
               <Link to={"/updateProductAdmin"}>
                  <div className='m-1'>
                     <button className='btn btn-warning w-100'>All Reports</button>
                  </div>
               </Link>
            </div>


            <div className="col-md-4 col-4">
               <Link to={"#"}>
                  <div className='m-1'>
                     <button className='btn btn-danger w-100'>Approved On Specific Product</button>
                  </div>
               </Link>
            </div>


            
            <div className="col-md-4 col-4">
               <Link to={"#"}>
                  <div className='m-1'>
                     <button className='btn btn-success w-100'>Get All Product By Insert Data</button>
                  </div>
               </Link>
            </div>

         </div>
      
      </>
   )
}
