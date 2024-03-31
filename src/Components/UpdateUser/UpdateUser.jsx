import React from 'react'
import axios from "axios";
import { useFormik } from "formik" ;
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';


export default function UpdateUser() {
   const navigate = useNavigate() ;
   const {id} = useParams();

   const [error , setError] = useState(null) ;
   const [infoUser , setInfoUser] = useState(null) ;

   const header = {
      token:localStorage.getItem("token")
   }

   async function submitUpdateUser(values){
      let valuesData = {};
      if(values.name){
         valuesData.name = values.name
      }
      if(values.email){
         valuesData.email = values.email
      }
      if(values.phone){
         valuesData.phone = values.phone
      }
      if(values.role){
         valuesData.role = values.role
      }
      if(values.isActive){
         valuesData.isActive = values.isActive
      }
      if(values.isBlocked){
         valuesData.isBlocked = values.isBlocked
      }
      console.log(valuesData);

      let {data} = await axios.put(`https://free-palestine-back-end.onrender.com/api/v1/users/${id}` , valuesData , {headers:header})
      .catch((error)=>{
         setError(error.response.data.message)
         toast.error(error.response.data.message)
         console.log(error);

      })

      if(data.message === "success"){
         toast.success(data.message + "  " +  "Update User")
         console.log(data);
      }
   }

   let validationSchema = Yup.object({
      name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").trim() ,
      email:Yup.string().email().trim() ,
      phone:Yup.string().trim() ,
      role:Yup.string() ,
      isActive:Yup.boolean() ,
      isBlocked:Yup.boolean() ,
   })




   let formik = useFormik({
      initialValues:{
         name:"" ,
         phone:"" ,
         email:"" ,
         role:"" ,
         isActive :"" ,
         isBlocked :"" ,
      } , validationSchema , 
      onSubmit:submitUpdateUser
   })
   
   return (
      <>
         <div className="w-75 p-2 m-auto mt-5">
            <h1 className="main-header">Update User</h1>
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
                  <label htmlFor="email" className="form-label">Enter User Email</label>
                  <input type="email" 
                     value={formik.values.email}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="email"  
                     name="email" 
                     placeholder="name@example.com" />
                  {formik.errors.email  && formik.touched.email?<div className="alert alert-danger mt-4 p-2">{formik.errors.email}</div> :""}
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


               <div className="my-4">
                  <label htmlFor="role" className="form-label">Enter User Role</label>
                  <select
                     
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="role"  
                     name="role" 
                     placeholder="Enter Role">
                        <option>Choose Role</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"moderator"}>Moderator</option>
                        <option value={"user"}>User</option>
                     </select>
                  {formik.errors.role && formik.touched.role?<div className="alert alert-danger mt-4 p-2">{formik.errors.role}</div> :""}
               </div>


               <div className="d-flex justify-content-center">
                     <div>
                        <h3 className='text-center'>Active User</h3>
                        <div className="form-check form-check-inline mx-5">
                           <input className="form-check-input" type="radio" 
                              onChange={formik.handleChange} 
                              onBlur={formik.handleBlur}
                              value="true"
                              id="Active"
                              name="isActive" />
                           <label className="form-check-label" htmlFor="Active">Active</label>
                        </div>

                        <div className="form-check form-check-inline mx-5">
                           <input className="form-check-input" type="radio" 
                              onChange={formik.handleChange} 
                              onBlur={formik.handleBlur}
                              value="false"
                              id="NotActive"
                              name="isActive" />
                           <label className="form-check-label" htmlFor="NotActive">Not Active</label>
                        </div>
                        {formik.errors.isActive && formik.touched.isActive?<div className="alert alert-danger mt-4 p-2">{formik.errors.isActive}</div> :""}
                     </div>

                     <div>
                        <h3 className='text-center'>Blocked User</h3>
                        <div className="form-check form-check-inline mx-5">
                           <input className="form-check-input" type="radio" 
                              onChange={formik.handleChange} 
                              onBlur={formik.handleBlur}
                              value="true"
                              id="Blocked"
                              name="isBlocked" />
                           <label className="form-check-label" htmlFor="Blocked">Blocked</label>
                        </div>

                        <div className="form-check form-check-inline mx-5">
                           <input className="form-check-input" type="radio" 
                              onChange={formik.handleChange} 
                              onBlur={formik.handleBlur}
                              value="false"
                              id="NotBlocked"
                              name="isBlocked" />
                           <label className="form-check-label" htmlFor="NotBlocked">Not Blocked</label>
                        </div>
                        {formik.errors.isActive && formik.touched.isActive?<div className="alert alert-danger mt-4 p-2">{formik.errors.isActive}</div> :""}
                     </div>
               </div>

               <div class="d-grid gap-2 col-8 mx-auto mt-4 text-center">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-color text-white btn-lg mt-2">Update User</button>
               </div>

            </form>
         </div>
      </>
   )
}
