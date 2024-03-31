import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import image from "../../Assets/images/1.jpeg"
import { ProductContext } from '../../Context/ProductContext.js'
import { UserContext } from '../../Context/UserContext.js'

export default function ProductDetails() {

   const {products , all_Reports , rejectedProductFun ,   productDetails  , setProducts , resultCount , getProductDetails , setResultCount  , metadata  , getData, loading , error , setError , getDataSearch} = useContext(ProductContext)
   const {admin , moderator} = useContext(UserContext)

   const {id} = useParams()
   const navigate = useNavigate()



   function rejected (e , id){
      rejectedProductFun(id) ;
      navigate("/")
      // console.log("rejected Product Details");
   }


   useEffect(() => {
      getProductDetails(id)
   }, [])
   
   return (
      <>
         <div className="container">

            <div className="row my-5">
               <div className="col-md-4 offset-md-4 ">
                     <div className="cardProductDetails overflow-hidden rounded-2">
                        <img src={productDetails?.imgCover?.secure_url} alt="" className='w-100' />
                     </div>
               </div>
            </div>

            <div className="row my-5 rowDetails">
               <div className="col-md-4 offset-md-2 mt-4">
                  <div className="">
                     <h3>Product Name : {productDetails?.title}</h3>
                     <p>Description : {productDetails?.description}</p>
                     <p>Category: {productDetails?.category?.name}</p>
                     <p>Company: {productDetails?.company?.name}</p> 

                     <h3>All_Reports: </h3> 
                     {/* {all_Reports.map((ele)=>{
                        return (
                           <h3>{ele.text}</h3>
                        )
                     })} */}



                  </div>
               </div>

               <div className="col-md-4 offset-md-2 mt-4">
                  <div className="">
                     <h3>Product Name</h3>
                     <p>Rate: 10%</p>
                     <p>Category: </p>
                     <p>Company: </p>
                  </div>
               </div>
            </div>

            {/* <div className="row justify-content-center flex-column align-items-center">
               <Link className='btn btn-warning w-75 ' to={`/reportProduct/${id}`}>Report On Product</Link>
               {admin || moderator? <>
                  <button className='btn btn-danger w-75 my-2 ' onClick={()=>{rejectedProductFun(productDetails?._id)}}>Rejected Products</button>
               </> : <></>}
            </div> */}

            <div className="row justify-content-center flex-column align-items-center">
               {admin || moderator? <>
                  <button type='button' className='btn btn-danger w-75 my-2 ' onClick={(e  , id)=>{rejected(e , productDetails?._id)}} >Rejected Products</button>
               </> : <>
                  <Link className='btn btn-warning w-75 ' to={`/reportProduct/${id}`}>Report On Product</Link>
               </>}
            </div>

         </div> 
      </>
   )
}
