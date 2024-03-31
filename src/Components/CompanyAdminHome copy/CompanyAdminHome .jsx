import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading.jsx';
import toast from 'react-hot-toast';
import image  from "../../Assets/images/Company.gif"
import { UserContext } from '../../Context/UserContext.js';


export default function CompanyAdminHome() {

   const {user} = useContext(UserContext)

      let header = {
         token:localStorage.getItem("token"),
      };

      function getCompany(){
         return axios.get(`http://localhost:5000/api/v1/company` ,  {headers:header} )
      }
      const {data , dataUpdatedAt , isError , isFetched , isLoading , refetch , remove} = useQuery("getCompany" , getCompany)



      async function deleteCompany(e , id){
         if (window.confirm("Are You Sure Delete Company") === true) {
            let response =   await axios.delete(`http://localhost:5000/api/v1/Company/${id}` ,  {headers:header} )
            .catch((error)=>{
               console.log(error.response?.data.message);
               toast.error(error.response?.data.message)
            })
            if(response?.data.message === "success"){
               console.log(response);
               toast.success(response?.data.message + " Delete Company")
               window.location.reload()
            }
         } 
      }




   
   return (
      <>
      <div className="container">

         <div className='d-flex justify-content-between align-items-center m-1'>
            <div>
               <h1 className='h4 fw-bold main-color'>Dashboard Company</h1>
               <h3 className='admin-name'>{user.name?.split(" ").slice(0,2).join(" ")}</h3>
            </div>
            <div className='w-25 '>
               <img src={image} alt="product" className='w-100 head-image'/>
            </div>
         </div>




         <Link to={"/addCompany"} className='d-block w-75 m-auto my-4'><button className='btn btn-success btn-sm w-100'>Add New Company</button></Link>
         
         <div className="row">
            {isError? <div className='alert alert-danger w-75'>{isError}</div> : ""}

            {isLoading? <Loading/> : <>
            
            
            {data?.data?.companies.map((ele)=>{
                  return(
                     <>
                        <div key={ele._id} className="g-2 col-4  col-lg-3">
                              <div className="card">
                                 <Link to={`/companyDetailsAdmin/${ele._id}`}>
                                    <img src={ele.image} alt={ele.name} className="card-img-top" height={100} />
                                 </Link>
                                    <h5 className="text-center mt-4">{ele.name}</h5>
                                    <div className="card-body">
                                       <p className="card-text">{ele.description}</p>
                                    </div>

                                 <div class="btn-group btn-group-sm d-flex justify-content-center m-1" role="group" aria-label="Small button group">
                                    <Link to={`/updateCompany/${ele._id}`}><button className='btn btn-warning  btn-sm m-1'><i class="fa-solid fa-pen"></i></button></Link>
                                    <button onClick={(e , id)=>{deleteCompany( e , ele._id)}} className='btn btn-danger  btn-sm m-1'><i class="fa-solid fa-trash"></i></button>
                                 </div>

                              </div>
                        </div> 
                     </>
                  )
               })}
            </>}
         </div>

      </div>
      
      
      </>
   )
}
