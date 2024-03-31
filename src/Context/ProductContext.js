
import axios from "axios";
import { createContext , useState } from "react";



export let ProductContext = createContext();


export default function ProductContextProvider(props){


   const [products , setProducts] = useState([]) ;
   const [notActiveProducts , setNotActiveProducts] = useState([]) ;
   const [rejectedProducts , setRejectedProducts] = useState([]) ;


   const [productDetails , setProductDetails] = useState({}) ;
   const [all_Reports , setAll_Reports] = useState([]) ;

   const [resultCount , setResultCount] = useState([]) ;
   const [loading , setLoading] = useState(false) ;
   const [error , setError] = useState(null) ;
   const [metadata , setMetadata] = useState({}) ;



   //& Get Active Product :
   async function getNotActiveProduct(){
      setLoading(true)
      let response =   await axios.get(`https://free-palestine-back-end.onrender.com/api/v1/products?active=false&&isProcess=true`)
      .catch((error)=>{
         // console.log(error.response?.data.message);
         // setError(error.response?.data.message);
         setLoading(false)
      })
      if(response?.data.message === "success"){
         // console.log(response);
         // console.log(response.data.products);
         // setMetadata(response.data.metadata);
         setNotActiveProducts(response.data.products);
         setLoading(false)
      }
   }


   //& Get Rejected Product :
   async function getRejectedProduct(){
      setLoading(true)
      let response =   await axios.get(`https://free-palestine-back-end.onrender.com/api/v1/products?active=false&isProcess=false`)
      .catch((error)=>{
         console.log(error.response?.data.message);
         setLoading(false)
      })
      if(response?.data.message === "success"){
         // console.log(response);
         // console.log(response.data.products);
         // setMetadata(response.data.metadata);
         setRejectedProducts(response.data.products);
         setLoading(false)
      }
   }


   //& Active Product :
   async function activeProductFun(id){
      setLoading(true)

      let header = {
         token:localStorage.getItem("token"),
      };
      console.log(header);

      let response =   await axios.patch(`https://free-palestine-back-end.onrender.com/api/v1/products/active/${id}` , {} ,  {headers:header}  )
      .catch((error)=>{
         console.log(error);
         // setError(error.response?.data.message);
         setLoading(false)
      })
      if(response?.data.message === "success"){
         console.log(response);
         setLoading(false)
      }
      console.log("Api Call");
      console.log(id);

      getNotActiveProduct()
      getRejectedProduct()
   }


   //& Rejected Product :
   async function rejectedProductFun(id){
      setLoading(true)

      let header = {
         token:localStorage.getItem("token"),
      };
      console.log(header);

      let response =   await axios.patch(`https://free-palestine-back-end.onrender.com/api/v1/products/block/${id}`  , {} ,  {headers:header} )
      .catch((error)=>{
         console.log(error.response?.data.message);
         // setError(error.response?.data.message);
         setLoading(false)
      })
      if(response?.data.message === "success"){
         console.log(response);
         setLoading(false)
      }
      getNotActiveProduct()
   }


   //& Get Product Details :
   async function getProductDetails(id){
      setLoading(true)
      let response =   await axios.get(`https://free-palestine-back-end.onrender.com/api/v1/products/${id}`)
      .catch((error)=>{
         // console.log(error.response?.data.message);
         setError(error.response?.data.message);
         setLoading(false)
      })
      if(response?.data.message === "success"){
         // console.log(response.data.products);
         // setMetadata(response.data.metadata);
         setProductDetails(response.data.product);
         setAll_Reports(response.data.product.All_Reports)
         // setResultCount(response.data?.results)
         setLoading(false)
      }
   }


   return (
      <>
         <ProductContext.Provider value={{
                  products , 
                  setProducts , 

                  loading ,
                  setLoading ,

                  error , 
                  setError ,

                  all_Reports , 
                  setAll_Reports , 

                  productDetails , 
                  setProductDetails , 

                  notActiveProducts , 
                  setNotActiveProducts ,

                  rejectedProducts , 
                  setRejectedProducts ,

                  resultCount ,
                  setResultCount ,

                  metadata ,
                  setMetadata ,

                  activeProductFun ,
                  rejectedProductFun , 
                  getProductDetails , 
                  getNotActiveProduct ,
                  getRejectedProduct ,
            }}>
            {props.children}
         </ProductContext.Provider>
      </>
   )

}