
import axios from "axios";
import { createContext, useState } from "react";



export let CategoryContext = createContext();


export default function CategoryContextProvider(props){


      const [category , setCategory] = useState([]) ;
      const [ErrorCategoryName , setErrorCategoryName] = useState(null) ;
      const [categoryName , setCategoryName] = useState(null) ;
      const [errorCategory , setErrorCategory] = useState(null) ;


      //& Get All Category By Page :
      async function getCategoryName(id){
         let response =   await axios.get(`https://free-palestine-back-end.onrender.com/api/v1/categories/${id}`)
         .catch((error)=>{
            // setErrorCategoryName(error.response?.data.message);
            // console.log(error);
            // console.log(error.response?.data.message);
            setErrorCategoryName(error.response?.data.message)
         })
         if(response?.data.message === "success"){
            setCategoryName(response.data.category.name);
            // console.log(response.data.category.name);
         }
      }


 

      //^ Function Get All Categories  :
      async function getCategory(){
         let header = {
            token:localStorage.getItem("token"),
         };
   
         let response =   await axios.get(`https://free-palestine-back-end.onrender.com/api/v1/categories` ,  {headers:header} )
         .catch((error)=>{
            setErrorCategory(error.response?.data.message);
         })
         if(response?.data.message === "success"){
            console.log(response);
            setCategory(response?.data.categories);
         }
      }




   return (
      <>
         <CategoryContext.Provider value={{category   , getCategoryName , categoryName , setCategoryName ,  getCategory , errorCategory }}>
            {props.children}
         </CategoryContext.Provider>
      </>
   )
}