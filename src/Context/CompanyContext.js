
import axios from "axios";
import { createContext, useState } from "react";



export let CompanyContext = createContext();


export default function CompanyContextProvider(props){


   let [company , setCompany] = useState([]) ;
   let [errorCompany , setErrorCompany] = useState(null) ;


   // //& Get All Company By Page :
   // async function getCompany(){
   //    let response =   await axios.get("http://localhost:5000/api/v1/company")
   //    .catch((error)=>{
   //       setErrorCompany(error.response?.data.message);
   //    })
   //    if(response?.data.message === "success"){
   //       setCompany(response.data.companies);
   //    }
   // }


      //& Get All Company By Page :
      async function getCompany(){
         let header = {
            token:localStorage.getItem("token"),
         };
   
         let response =   await axios.get(`http://localhost:5000/api/v1/company` ,  {headers:header} )
         .catch((error)=>{
            setErrorCompany(error.response?.data.message);
         })
         if(response?.data.message === "success"){
            console.log(response);
            setCompany(response?.data.companies);
         }
      }

   return (
      <>
         <CompanyContext.Provider value={{company   , getCompany , errorCompany }}>
            {props.children}
         </CompanyContext.Provider>
      </>
   )
}
