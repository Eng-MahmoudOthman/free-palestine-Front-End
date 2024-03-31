import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'

export default function CategoryDetailsAdmin() {

   const params = useParams() ;

   let header = {
      token:localStorage.getItem("token"),
   };

   function getSpecificCategory(){
      return axios.get(`   http://localhost:5000/api/v1/categories/${params.id}` ,  {headers:header} )
   }


   const {data , dataUpdatedAt , isError , isFetched , isLoading , refetch , remove} = useQuery("getSpecificCategory" , getSpecificCategory)
   

   return (
      <>
         <div className="container">
            <h1 className='main-header'>CategoryDetailsAdmin</h1>

            <div className="row my-5">
                  <div className="col-md-4 offset-md-4 ">
                        <div className="cardProductDetails overflow-hidden rounded-2">
                           <img src={data?.data?.category.image} alt="" className='w-100' />
                        </div>
                  </div>
            </div>

            <div className="row my-5 ">
               <div className="col-md-8 offset-md-2 mt-4">
                  <div className="">
                     <h3 className='text-center main-color fw-bold'>{data?.data?.category.name}</h3>
                  </div>
               </div>
            </div>

         </div>
      </>
   )
}
