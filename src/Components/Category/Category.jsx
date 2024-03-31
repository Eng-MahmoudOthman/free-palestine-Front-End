
import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading.jsx";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination.jsx";

export default function Category() {

   const [categories, setCategories] = useState([]) ;
   const [loading, setLoading] = useState(false) ;
   const [error , setError] = useState(null) ;



   //^ Function Get All Categories  :
   async function getData(search){
      setLoading(true)
      let limit = 50
      let keyword = "";
      if(search){
         keyword = `keyword=${search}&`
         limit = 0
      }

      let header = {
         token:localStorage.getItem("token"),
      };

      let response =   await axios.get(`https://free-palestine-back-end.onrender.com/api/v1/categories?${keyword}&limit=${limit}` ,  {headers:header} )
      .catch((error)=>{
         setError(error.response?.data.message)
         setLoading(false)
      })
      if(response?.data.message === "success"){
         setCategories(response?.data.categories);
         setError(null)
         setLoading(false)
      }
   }


   //^ Search In Category By Category Name :
   function searchCategory (e){
      getData((e.target.value).toLowerCase())
   }


   //^ Function Get All Categories  :
   async function fetchData(pageNumber){
      setLoading(true)
      let header = {
         token:localStorage.getItem("token"),
      };

      let response =   await axios.get(`https://free-palestine-back-end.onrender.com/api/v1/categories?page=${pageNumber}&limit=50` ,  {headers:header} )
      .catch((error)=>{
         setError(error.response?.data.message)
         setLoading(false)
      })
      if(response?.data.message === "success"){
         setCategories(response?.data.categories);
         setError(null)
         setLoading(false)
      }
   }

   const handlePageClick = (data)=>{
      // console.log(data.selected + 1);
      fetchData(data?.selected + 1)
   }

   //^ Fetch Api  :
   useEffect(()=>{
      getData()
   } , [])

   return (
      <>
         <h1 className="text-center my-5 main-header">Categories</h1>

         <div className="container">

            <div className="row my-5">
               <div className="col-10 offset-1">
                  <form action="">
                     <input type="search" onChange={(e)=>{searchCategory(e)}} name="search" className="form-control rounded-0" placeholder="Search Product Name"/>
                  </form>
               </div>
            </div>


            <div className="row mb-5">
               {error? <p className="alert alert-danger">{error}</p> : 
                  <> 
                     {/* {loading?<Loading/> : categories?.filter((item)=>item.name.toLowerCase().includes(search)).map((ele)=>{ */}
                     {loading?<Loading/> : categories?.map((ele)=>{
                           return (
                              <>
                                 <div key={ele._id} className="g-2 col-4  col-lg-3">
                                    <Link to={`/category/${ele._id}/products`}>
                                       <div className="card">
                                          <img src={ele.image} alt={ele.name} className="card-img-top" height={100} />
                                          <h5 className="text-center mt-4">{ele.name}</h5>
                                          <div className="card-body">
                                             <p className="card-text">{ele.description}</p>
                                          </div>
                                       </div>
                                    </Link>
                                 </div> 


                              </>
                           )
                        }
                     )}
                  </>
               }
            </div>

            <Pagination handlePageClick={handlePageClick} />
         </div> 

      </>
   )
} 
