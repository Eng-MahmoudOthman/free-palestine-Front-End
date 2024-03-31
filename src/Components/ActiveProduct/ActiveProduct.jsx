import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../Context/ProductContext.js'

export default function ActiveProduct() {
   const {activeProductFun , rejectedProductFun ,  notActiveProducts ,  products  ,  resultCount ,  loading  ,  error  ,  setError  ,  getNotActiveProduct} = useContext(ProductContext)


   function active(e , id){
      console.log("active");
      activeProductFun(id)

      // Last Product Not Deleted
      window.location.reload()
   }

   function rejected(e , id){
      console.log("rejected");
      rejectedProductFun(id)

      // Last Product Not Deleted
      window.location.reload()
   }

   useEffect(() => {
      getNotActiveProduct()
   }, [])
   console.log(notActiveProducts);
   return (
      <>
         <div className="container">
            <h1 className='main-header'>Active Product</h1>
            <div className="row">
               {notActiveProducts?.map((ele)=>{
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

                              {/* <div class="btn-group btn-group-sm d-flex justify-content-center m-1" role="group" aria-label="Small button group">
                                 <button type="button"  onClick={(e , id)=>{rejected(e , ele._id)}} disabled={ele.active && ele.isProcess} class="btn btn-outline-danger"><i class="fa-solid fa-xmark"></i></button>
                                 <button type="button"  onClick={(e , id)=>{active(e  , ele._id)}}   disabled={ele.active && ele.isProcess} class="btn btn-outline-success"><i class="fa-regular fa-thumbs-up"></i></button>
                              </div> */}

                              <div class="btn-group btn-group-sm d-flex justify-content-center m-1" role="group" aria-label="Small button group">
                                 <button type="button"  onClick={(e , id)=>{rejected(e , ele._id)}} disabled={false} class="btn btn-outline-danger"><i class="fa-solid fa-xmark"></i></button>
                                 <button type="button"  onClick={(e , id)=>{active(e  , ele._id)}}   disabled={false} class="btn btn-outline-success"><i class="fa-regular fa-thumbs-up"></i></button>
                              </div>

                           </div>
                        </div>
                     </>
                  )
               })}

            </div>
         </div>
      
      
      
      </>
   )
}
