
import React, { useContext } from 'react'
import axios from "axios";
import { useFormik } from "formik" ;
import toast from "react-hot-toast";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.js';



export default function ConfirmedEmail() {

   const navigate = useNavigate() ;
   const { setUser  , setUserToken , setAdmin , setModerator , setProductSpecificUser} = useContext( UserContext )

   
   function logOut(){
      localStorage.clear() ;
      setUser({}) ;
      setUserToken("") ;
      setAdmin(false)
      setModerator(false)
      setProductSpecificUser([])
      navigate("/login")
   }



   async function submitConfirmedEmail(values){
      const header = {
         token:localStorage.getItem("token")
      }
      let {data} = await axios.post("https://free-palestine-back-end.onrender.com/api/v1/auth/confirmedEmail" , values ,{ headers:header})
      .catch((error)=>{
         toast.error(error.response.data.message)
      })


      //^Check Login Success User :
      if(data.message === "success"){
         toast.success("Success")
         logOut()
      }
   }


   let validationSchema = Yup.object({
      code:Yup.string().trim()
   })




   let formik = useFormik({
      initialValues:{
         code:"" ,
      } , validationSchema , 
      onSubmit:submitConfirmedEmail
   })
   return (
      <>
         <div className="w-50 p-2 m-auto mt-5">
            <h1 className="main-header">Confirmed Email</h1>
            <form action="" onSubmit={formik.handleSubmit}>

               <h5 className="text-center text-primary">Enter Code Number</h5>
               <div className="my-4">
                  <label htmlFor="code" className="form-label">Enter code</label>
                  <input type="text" 
                     value={formik.values.code}
                     onChange={formik.handleChange} 
                     onBlur={formik.handleBlur}
                     className="form-control" id="code"  
                     name="code" 
                     placeholder="Enter Code Number" />
                  {formik.errors.code  && formik.touched.code?<div className="alert alert-danger mt-4 p-2">{formik.errors.code}</div> :""}
               </div>

               <div class="d-grid gap-2 col-6 mx-auto">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-color text-white btn-lg mt-2">Login</button>
               </div>
            </form>
         </div>
      </>
   )
}
