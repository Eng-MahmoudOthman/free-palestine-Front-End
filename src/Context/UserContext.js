import axios from "axios";
import { createContext, useState } from "react";


export let UserContext = createContext();


export default function UserContextProvider(props){


   const [user , setUser] = useState({}) ;

   const [admin , setAdmin] = useState(false) ;
   const [moderator , setModerator] = useState(false) ;
   const [productSpecificUser , setProductSpecificUser] = useState([]) ;
   const [error , setError] = useState(null) ;

   const [userToken , setUserToken] = useState("") ;



   //& Get All Products To Specific User :
   async function getProductsSpecificUser(id){
      let response =   await axios.get(`https://free-palestine-back-end.onrender.com/api/v1/products/productsSpecificUser/${id}`)
      .catch((error)=>{
         console.log(error?.response?.data.message);
         // setError(error.response?.data.message)
      })
      if(response?.data.message === "success"){
         // console.log(response?.data?.products);
         setProductSpecificUser(response?.data?.products);
      }
   }



console.log("context=>" , user);

   return (
      <>
      {console.log("moderator" , moderator)}
         <UserContext.Provider value={{user , setUser , userToken , setUserToken , admin , setAdmin , moderator , setModerator , productSpecificUser , setProductSpecificUser , error , setError , getProductsSpecificUser}}>
            {props.children}
         </UserContext.Provider>
      </>
   )
}
























// import { createContext, useState } from "react";


// export let UserContext = createContext();


// export default function UserContextProvider(props){


//    let [user , setUser] = useState({}) ;

//    let [admin , setAdmin] = useState(false) ;

//    let [userToken , setUserToken] = useState("") ;

//    return (
//       <>
//          <UserContext.Provider value={{user , setUser , userToken , setUserToken , admin , setAdmin}}>
//             {props.children}
//          </UserContext.Provider>
//       </>
//    )
// }