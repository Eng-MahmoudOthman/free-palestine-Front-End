import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../Context/ProductContext.js'
import axios from 'axios';
import Loading from '../Loading/Loading.jsx';
import toast from 'react-hot-toast';

export default function RejectedProducts() {
   
   const {activeProductFun , getRejectedProduct , loading , error , rejectedProducts } = useContext(ProductContext)
   const [isLoading, setIsLoading] = useState(false)


      function active(e , id){
         console.log("active");
         activeProductFun(id)

         // Last Product Not Deleted
         window.location.reload()
      }




      async function deleteProduct (e , id){
         if (window.confirm("Are You Sure Delete Product") === true) {
            setIsLoading(true)
            let header = {
               token:localStorage.getItem("token"),
            };
      
            let response =   await axios.delete(`http://localhost:5000/api/v1/products/${id}` ,  {headers:header} )
            .catch((error)=>{
               console.log(error.response?.data.message);
               toast.error(error.response?.data.message)
               setIsLoading(false)
            })
            if(response?.data.message === "success"){
               console.log(response);
               toast.success(response?.data.message + " Delete Product")
               setIsLoading(false)
               window.location.reload()
            }
         } 
      }
   


   useEffect(() => {
      getRejectedProduct()
   }, [])

   return (
      <>
         <div className="container">
            <h1 className='main-header'>Rejected Products</h1>
            <div className="row">
               {rejectedProducts.length? <></> :  <div className='alert alert-danger w-75'>Not Found Rejected Products</div> }
               {loading? <Loading/> : <>
                     {rejectedProducts?.map((ele)=>{
                        return (
                           <>
                              <div key={ele._id} className="col-md-2 col-4 mt-4 ">
                                 <div className=" border border-1">
                                    <div className="" >
                                       <img src={ele.imgCover.secure_url} alt={ele.title} className="w-100" />
                                    </div>

                                    <div className="p-2">
                                       <h2 className="head-profile">{ele.title.split(" ").slice(0,2).join(" ")}</h2>
                                       <p className="profile-p">{ele.description}</p>
                                    </div>


                                    <div class="btn-group btn-group-sm d-flex justify-content-center m-1" role="group" aria-label="Small button group">
                                       <button type="button"  onClick={(e , id)=>{active(e  , ele._id)}}   disabled={false} class="btn btn-outline-success"><i class="fa-regular fa-thumbs-up"></i></button>
                                          
                                       {isLoading? <>
                                          <button className='btn btn-danger btn-sm'><i className='fas fa-spinner fa-spin'></i></button>
                                       </> : <>
                                          <button className='btn btn-danger btn-sm' onClick={(e , id)=>{deleteProduct ( e , ele._id)}}>Deleted</button>
                                       </>}
                                    </div>
                                 </div>
                              </div>
                           </>
                        )
                     })}
                  </>
               }
            </div>
         </div>
      </>
   )
}
