import React, { useContext } from 'react'
import axios from "axios";
import { useFormik } from "formik" ;
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext.js';



export default function ChangeInfoUser() {

   const {user , setUser} = useContext(UserContext) ;

   let navigate = useNavigate()
   const [error , setError] = useState(null)


   async function submitChangeUserInfo (values){

      let header = {
         token:localStorage.getItem("token"),
      };
   
      await axios.put("https://free-palestine-back-end.onrender.com/api/v1/auth/changeUserInfo" , values , {headers:header}  )
      .then((response)=>{
         if(response.data.message === "success"){
            toast.success(`${response.data.message} Change User Information`);
            // console.log(response);
            // console.log(response.data.user);
            localStorage.setItem("user" , JSON.stringify(response.data.user))
            setUser(response.data.user)
            navigate("/profile")

         }
      })
      .catch((error)=>{
         console.log(error);
         // console.log(error.response.data.message);
         setError(error.response.data.message)
         toast.error(error.response.data.message)
      })
   }


   let validationSchema = Yup.object({
      name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").required("Name is Required").trim() ,
      phone:Yup.string().required().trim() ,
   })




   let formik = useFormik({
      initialValues:{
         name:"" ,
         phone:"" ,
      } , validationSchema , 
      onSubmit:submitChangeUserInfo
   })
   return (
      <>
         <div className="w-75 p-2 m-auto mt-5">
            <h1 className='main-header '>Change User Information</h1>

            <form action="" onSubmit={formik.handleSubmit}>

               {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}

               <div className="my-4">
                  <label htmlFor="name" className="form-label">Enter User Name</label>
                  <input type="text" 
                     value={formik.values.name}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="name"  
                     name="name" 
                     placeholder="Mahmoud Othman" />
                  {formik.errors.name && formik.touched.name?<div className="alert alert-danger mt-4 p-2">{formik.errors.name}</div> :""}
               </div>


               <div className="my-4">
                  <label htmlFor="phone" className="form-label">Enter User Phone</label>
                  {/* <input type="tel"  */}
                  <input type="text" 
                     value={formik.values.phone}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="phone"  
                     name="phone" 
                     placeholder="01X XXX XXX XX" />
                  {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger mt-4 p-2">{formik.errors.phone}</div> :""}
               </div>

               <div class="d-grid gap-2 col-6 mx-auto">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-color text-white btn-lg mt-2">Register</button>
               </div>

            </form>
         </div>
      </>
   )
} 