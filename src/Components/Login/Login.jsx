import axios from "axios";
import { useFormik } from "formik" ;
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { UserContext } from "../../Context/UserContext.js";
import { jwtDecode } from "jwt-decode";

export default function Login(){

   let navigate = useNavigate()
   const [error , setError] = useState(null)
   const { setUser  , setUserToken ,  setAdmin  , setModerator} = useContext(UserContext)

   //& Decoded Token :
   function decodedToken(){
      const userToken =  localStorage.getItem('token'); 
      let decoded = jwtDecode(userToken);
      return decoded.role
   }


   //& Handle Phone Empty Or Email Empty :
   async function submitLogin(values){
      if(values.phone){
         values = {phone:values.phone , password:values.password}
      } else{
         values = {email:values.email , password:values.password}
      }
      let {data} = await axios.post("https://free-palestine-back-end.onrender.com/api/v1/auth/signin" , values)
      .catch((error)=>{
         setError(error.response.data.message)
         toast.error(error.response.data.message)
      })


      //^Check Login Success User :
      if(data.message === "success"){

         //& save Token In Local Storage And Save Token in Use Context :
         localStorage.setItem("token" , data.token) ;
         setUserToken(data.token) ;
         

         //& save User Information In Local Storage And Save User Information in Use Context :
         localStorage.setItem("user" , JSON.stringify(data.user))
         setUser(data.user)
         toast.success("Success")


         //& Check Admin Or Or Moderator Or User :
         if( decodedToken() === "admin"){
            setAdmin(true)
         }else if (decodedToken() === "moderator"){
            setModerator(true)
         }


         //& Navigation to Home Page :
         navigate("/")
      }else{
         navigate("/login")
      }
   }

   let validationSchema = Yup.object({
      email:Yup.string().email().trim() ,
      phone:Yup.string().trim() ,
      password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , "should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
   })




   let formik = useFormik({
      initialValues:{
         phone:"" ,
         email:"" ,
         password:"" ,
      } , validationSchema , 
      onSubmit:submitLogin
   })
   return (
      <>
         <div className="w-75 p-2 m-auto mt-5">
            <h1 className="main-header">Login Now</h1>
            <form action="" onSubmit={formik.handleSubmit}>

            {error?<div className="alert alert-danger w-75  my-4">{error}</div> :""}

               <h5 className="text-center text-primary">Enter User Email Or Phone Number </h5>
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

               <div class="d-grid gap-2 col-6 mx-auto">
                  <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-color text-white btn-lg mt-2">Login</button>
               </div>
            </form>
         </div>
      </>
   )
} 