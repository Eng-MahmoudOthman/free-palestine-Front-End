import axios from "axios";
import { useFormik } from "formik" ;
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';


export default function UpdateCompany() {
   
   const params = useParams() ;
   const [error , setError] = useState(null)
   const header = {
      token: localStorage.getItem("token")
   }

      async function updateCompany(values){
         let {data} = await axios.put(`https://free-palestine-back-end.onrender.com/api/v1/company/${params.id}` , values , {headers:header})
         .catch((error)=>{
            setError(error.response.data.message)
            toast.error(error.response.data.message)
            // console.log(error.response.data.message);
         })


         //^Check Login Success User :
         if(data.message === "success"){
            toast.success("Success")
            // console.log(data);
         }
      }

      let validationSchema = Yup.object({
         name:Yup.string().trim() ,
         description:Yup.string().trim() 
      })




      let formik = useFormik({
         initialValues:{
            name:"" ,
            description:"" ,
         } , validationSchema , 
         onSubmit:updateCompany
      })
      return (
         <>
            <div className="w-75 p-2 m-auto mt-5">
               <h1 className="main-header">Update Company</h1>
               <form action="" onSubmit={formik.handleSubmit}>

               {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}

                  <div className="my-4">
                     <label htmlFor="name" className="form-label">Enter Company Name</label>
                     <input type="text" 
                        value={formik.values.name}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" id="name"  
                        name="name" 
                        placeholder="Enter Company Name" />
                     {formik.errors.name  && formik.touched.name?<div className="alert alert-danger mt-4 p-2">{formik.errors.name}</div> :""}
                  </div>


                  <div className="my-4">
                     <label htmlFor="description" className="form-label">Enter description</label>
                     <input type="text" 
                        value={formik.values.description}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" id="description"  
                        name="description" 
                        placeholder="Enter description" />
                     {formik.errors.description && formik.touched.description?<div className="alert alert-danger mt-4 p-2">{formik.errors.description}</div> :""}
                  </div>

                  <div class="d-grid gap-2 col-6 mx-auto">
                     <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-color text-white btn-lg mt-2">Login</button>
                  </div>
               </form>
            </div>
         </>
   )
}