import React from 'react'
import axios from "axios";
import { useFormik } from "formik" ;
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';



export default function AddUserAdmin() {
   let navigate = useNavigate() ;
   const [error , setError] = useState(null) ;
   const [infoUser , setInfoUser] = useState(null) ;

   const header = {
      token:localStorage.getItem("token")
   }

   async function submitAddUser(values){
      let {data} = await axios.post("https://free-palestine-back-end.onrender.com/api/v1/users" , values , {headers:header})
      .catch((error)=>{
         // setError(error.response.data.message)
         toast.error(error.response.data.message)
         console.log(error);

      })

      if(data.message === "success"){
         // navigate("/ShowInfoUserByAdmin/")
         console.log(data);
         setInfoUser(data.NewUser)
      }
      // console.log(values);
   }

   let validationSchema = Yup.object({
      name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").required("Name is Required").trim() ,
      email:Yup.string().email().required().trim() ,
      phone:Yup.string().required().trim() ,
      password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , "Should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
      rePassword:Yup.string().oneOf([Yup.ref("password")]  , "rePassword Should be Same Password").required() ,
      role:Yup.string()
   })




   let formik = useFormik({
      initialValues:{
         name:"" ,
         phone:"" ,
         email:"" ,
         password:"" ,
         rePassword:"" ,
         role:""
      } , validationSchema , 
      onSubmit:submitAddUser
   })
   
   return (
      <>
         { infoUser ? 
            <> 
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <h2>Name : <span className='text-danger'>{infoUser.name}</span></h2>
                        <h2>Email : <span className='text-danger'>{infoUser.email}</span></h2>
                        <h2>Phone : <span className='text-danger'>{infoUser.phone}</span></h2>
                        <h2>Password : <span className='text-danger'>{infoUser.password}</span></h2>
                        <h2>Role : <span className='text-danger'>{infoUser.role}</span></h2>
                     </div>
                  </div>
               </div>
            </>
            :       
            <>
            <div className="w-75 p-2 m-auto mt-5">
               <h1 className="main-header">Add Now User</h1>
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
                     <label htmlFor="password" className="form-label">Enter User Password</label>
                     <input type="password" 
                        value={formik.values.password}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" id="password"  
                        name="password" 
                        placeholder="Enter Password" />
                     {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-4 p-2">{formik.errors.password}</div> :""}
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



                  <div class="d-grid gap-2 col-6 mx-auto">
                     <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-color text-white btn-lg mt-2">Add New User</button>
                  </div>

               </form>
            </div>
            </> 
         }
      </>
   )
}
