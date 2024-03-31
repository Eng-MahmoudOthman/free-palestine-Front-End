// import React from 'react'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';




export default function ProtectedRoute(props) {

   if(localStorage.getItem('token') !== null){
         return props.children;
      }else{
         toast.error("Not Authorization Entered")
         return <Navigate to={'/login'}/>
      }
}









// // export default  function ProtectedRoute(props) {
//    const token =  localStorage.getItem('userToken'); 
//    let decoded = jwtDecode(token);
// // }
















      // if(response?.data?.message === "success"){
      //    return props.children;
      // }else{
      //    toast.error("Not Authorization Entered")
      //    return <Navigate to={'/login'}/>
      //    navigate('/login')

      // }


      // if(error?.response?.data.message === "Not Found User"){
      //    toast.error("Not Authorization Entered")
         // return <Navigate to={'/login'}/>
      //    navigate('/login')
      // }else{
         // toast.error("Not Authorization Entered")
         // return <Navigate to={'/login'}/>
      //    navigate('/login')
      // }
   


























   //   // 1- Check Token Exist Or Not
   //    if(!token) return next(new AppError("Token Not Exist" , 401)) ;

   //    // 2- verify Token
   //    let decoded = jwt.verify(token , process.env.SECRET_KEY) ;
   //    if(!decoded) return next(new AppError("Token Not Valid" , 401)) ;

   //    // 3- Check Exist User Or Not
   //    const user = await userModel.findById(decoded.userId) ;
   //    if(!user) return next(new AppError("User Not Exist.?" , 401)) ;

   //    if(user.passwordChangedAt){
   //       // 4- Change Password And Token Expired
   //       let time = parseInt(user?.passwordChangedAt.getTime() / 1000) ;
   //       // console.log(time , "|" , decoded.iat);
   //       if(time > decoded.iat) return next(new AppError("Token Not Valid..Login again" , 401)) ;
   //    }
