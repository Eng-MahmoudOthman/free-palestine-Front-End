import React from 'react'
import axios from "axios";
import { useFormik } from "formik" ;
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default function ChangePassword() {

   const [error , setError] = useState(null)
   const navigate = useNavigate (); 

   async function submitChangePassword(values){
      let header = {
         token:localStorage.getItem("token"),
      };

      await axios.patch("http://localhost:5000/api/v1/auth/changePassword" , values , {headers:header}  )
      .then((response)=>{
         if(response.data.message === "success"){
            toast.success(`${response.data.message} Change Password`);
            // console.log(response);
            localStorage.setItem("token" , response.data.token)
            navigate("/profile")
         }
      })
      .catch((error)=>{
         // console.log(error.response.data.message);
         setError(error.response.data.message)
         toast.error(error.response.data.message)
      })
   }

   let validationSchema = Yup.object({
      oldPassword:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , "Should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,

      newPassword:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , "Should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
      rePassword:Yup.string().oneOf([Yup.ref("newPassword")]  , "rePassword Should be Same Password").required() ,
   })




   let formik = useFormik({
      initialValues:{
         oldPassword:"" ,
         newPassword:"" ,
         rePassword:"" 
      } , validationSchema , 
      onSubmit:submitChangePassword
   })
   return (
      <>
      <div className="container">
         <h6 className='main-header '>Change Password</h6>

         <form action="" onSubmit={formik.handleSubmit}>

            {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}

            <div className="my-4">
               <label htmlFor="oldPassword" className="form-label">Enter User oldPassword</label>
               <input type="password" 
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  className="form-control" id="oldPassword"  
                  name="oldPassword" 
                  placeholder="Enter oldPassword" />
               {formik.errors.oldPassword && formik.touched.oldPassword?<div className="alert alert-danger mt-4 p-2">{formik.errors.oldPassword}</div> :""}
            </div>

            <div className="my-4">
               <label htmlFor="newPassword" className="form-label">Enter User newPassword</label>
               <input type="password" 
                  value={formik.values.newPassword}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  className="form-control" id="newPassword"  
                  name="newPassword" 
                  placeholder="Enter newPassword" />
               {formik.errors.newPassword && formik.touched.newPassword?<div className="alert alert-danger mt-4 p-2">{formik.errors.newPassword}</div> :""}
            </div>


            <div className="my-4">
               <label htmlFor="rePassword" className="form-label">Enter User rePassword</label>
               <input type="password" 
                  value={formik.values.rePassword}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  className="form-control" id="rePassword"  
                  name="rePassword" 
                  placeholder="Enter rePassword" />
               {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger mt-4 p-2">{formik.errors.rePassword}</div> :""}
            </div>



            <div class="d-grid gap-2 col-6 mx-auto">
               <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-color text-white btn-lg mt-2">Register</button>
            </div>

         </form>
      </div>
      
      
      </>
   )
}
