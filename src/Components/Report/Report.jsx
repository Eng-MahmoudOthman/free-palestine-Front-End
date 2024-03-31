import axios from 'axios';
import { useFormik } from "formik" ;
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';




export default function Report() {
   const [error , setError] = useState(null) ;
   const params = useParams() ;


   //& Handle Phone Empty Or Email Empty :
   async function submitReport(values){

      values.product = params.id
      let header = {token:localStorage.getItem("token")}

      await axios.post("http://localhost:5000/api/v1/reports" , values , {headers:header})
      .then((response)=>{
         if(response.data.message === "success"){
            toast.success(response.data.message) ;
            window.location.reload() ;
         }
      })
      .catch((error)=>{
         toast.error(error.response.data.message) ;
         setError(error.response.data.message) ;
      })
   }

   let validationSchema = Yup.object({
      text:Yup.string().min(2 , "Should be Character Less Than 2").max(500 , "Should be Character Less Than 2").trim() ,
   })

   let formik = useFormik({
      initialValues:{
         text:"" ,
         phone:"" ,
         exist:"" ,
      } , validationSchema , 
      onSubmit:submitReport
   })
   return (
      <>
         <div className="parentContainer p-2 m-auto mt-5">
            <form action="" onSubmit={formik.handleSubmit}>

               {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}

               <h5 className="text-center text-primary">Enter Your Report On Product</h5>

               <div className="my-4">
                     <textarea  
                     value={formik.values.text}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="text"  
                     name="text" cols="30" rows="10"
                     placeholder='Enter Your Comment Here'></textarea>
                  {formik.errors.text  && formik.touched.text?<div className="alert alert-danger mt-2 p-2">{formik.errors.text}</div> :""}
               </div>

               <div className="my-5">
                  <input className="form-control" type="text" 
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     value={formik.values.phone}
                     id="phone"
                     name="phone" 
                     placeholder='Enter Your Phone Number'/>
               </div>

               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" 
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     value="true"
                     id="inlineRadio1"
                     name="exist" />
                  <label className="form-check-label" htmlFor="inlineRadio1">غير مقاطع</label>
               </div>

               
               <div className="form-check form-check-inline mx-5">
                  <input className="form-check-input" type="radio" 
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     value="false"
                     id="inlineRadio2"
                     name="exist" />
                  <label className="form-check-label" htmlFor="inlineRadio2">مقاطعة</label>
               </div>

               <div className="d-grid gap-2 col-6 mx-auto">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn   bg-color btn-lg mt-2">Send Report</button>
               </div>

            </form>
         </div>
      </>
   )
}