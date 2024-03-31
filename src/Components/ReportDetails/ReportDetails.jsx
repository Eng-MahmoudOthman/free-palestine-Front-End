import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'

export default function ReportDetails() {
   const params  = useParams() ;
   const [reports, setReports] = useState([])

   async function reportsProduct (id){
		
		// setIsLoading(true)
		let header = {
			token:localStorage.getItem("token"),
		};

		let response =   await axios.get(`https://free-palestine-back-end.onrender.com/api/v1/products/${id}`)
		.catch((error)=>{
			console.log(error.response?.data.message);
			// setIsError(error.response?.data.message);
			toast.error(error.response?.data.message)
			// setIsLoading(false)
		})
		if(response?.data.message === "success"){
         setReports(response?.data.product.All_Reports)
			// console.log(response?.data);
			// console.log(response?.data.product.All_Reports[0].text);
			// console.log(response?.data.product.All_Reports[0].phone);
			// console.log(response?.data.product.All_Reports[0].product.title);
			// console.log(response?.data.product.All_Reports[0].createdBy.name);
			// toast.success(response?.data.message)
			// setIsLoading(false)
		}
	}


   useEffect(() => {
      reportsProduct(params.id)
   }, [])
   

   return (
      <>
         <div className="container">
            <h1>All Reports on Product</h1>
            <div className="row g-2">
               <h2 className='text-center main-color'>Total Reports = {reports.length?reports.length : "Zero"}</h2>
               {reports.length? <>
                  {reports?.map((ele)=>{
                     return(
                        <>
                           <div className="col-md-6 ">

                              <div className='p-2 text-center rounded-2 bg-body-secondary'>
                                 <h1 className='main-color'>{ele.product.title}</h1>
                                 <p className='fw-bold bg-white p-1'>{ele.text}</p>
                                 {ele.exist? <>
                                    <p className='fw-bold text-success'><i class="fa-regular fa-circle-check  fs-1"></i> <br/>Exist</p>
                                 </> : <>
                                    <p className='fw-bold text-danger'> <i class="fa-regular fa-circle-xmark fs-1"></i> <br/>Not Exist</p>
                                 </>}
                                 
                                 
                                 <div className="d-flex justify-content-between align-items-center report-info">
                                    <p><span className='fw-bold d-block'>User Name</span> {ele.createdBy.name.split(" ").slice(0,2).join(" ")}</p>
                                    <p><span className='fw-bold d-block'>Phone</span> {ele.phone}</p>
                                    <p><span className='fw-bold d-block'>Email</span> {ele.createdBy.email}</p>
                                 </div>
                                 
                                 <button className='btn btn-danger btn-sm w-75'>Delete</button>
                              </div>

                           </div>
                        </>
                     )
                  })}
               </> : <>
                  <h2 className='text-warning fw-bold text-center'>Not Found Reports On this Product</h2>
               </>}
            </div>
         </div>
      </>
   )
}
