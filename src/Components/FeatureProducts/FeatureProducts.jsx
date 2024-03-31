import React ,  {useEffect, useState}  from 'react'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading.jsx';
import axios from 'axios';
import Pagination from '../Pagination/Pagination.jsx';



export default function FeatureProducts() {
   
   const [products , setProducts] = useState([]) ;
   const [resultCount , setResultCount] = useState([]) ;
   const [loading , setLoading] = useState(false) ;
   const [error , setError] = useState(null) ;
   const [metadata , setMetadata] = useState({}) ;



   function searchInput (e){
      if(e.target.value === ""){
         setError(null)
      }
      getData((e.target.value).toLowerCase())
   }

   //& Get All Product By Page :
   async function getData(search){
      setLoading(true)
      let limit = 50
      let keyword = "";
      if(search){
         keyword = `&keyword=${search}`
         limit = 0
      }

      let response =   await axios.get(`http://localhost:5000/api/v1/products?active=true${keyword}&page=1&limit=${limit}`)
      .catch((error)=>{
         setError(error.response?.data.message);
         setLoading(false)
      })
      if(response?.data.message === "success"){
         // setMetadata(response.data.metadata);
         setProducts(response?.data?.products);
         setResultCount(response.data?.results)
         setLoading(false)
      }
   }

   const fetchData = async(currentPage)=>{
      setLoading(true)
      await axios.get(`http://localhost:5000/api/v1/products?active=true&page=${currentPage}&limit=50`)
      .then((response)=>{
         // console.log(response?.data?.products);
         setError(null)
         setProducts(response?.data?.products)
         setLoading(false)
      })
      .catch((error)=>{
         setError(error.response.data.message)
         // console.log(error);
         setLoading(false)
      })
   }

   const handlePageClick = (data)=>{
      // console.log(data.selected + 1);
      fetchData(data?.selected + 1)
   }

   useEffect(()=>{
      getData()
   } , [])

   return (
      <>

         <div className="container mb-5">

            <div className="row my-5">
               <div className="col-10 offset-1">
                  <form action="">
                     <input type="search" onChange={(e)=>{searchInput(e)}}  className='form-control w-100 m-auto my-2 ' placeholder='Search By Product Name'  name="search" />
                  </form>
               </div>
            </div>


            <div className="row">
               <div className="col-10 offset-1 text-center">
                  <h4 className='btn btn-success totalProduct w-75 text-white'>Total Products  :  {resultCount} </h4>
               </div>
            </div>


            <div className="row mb-5">
               {error? <p className="alert alert-danger">{error}</p> : <>

                  {loading? <Loading/> : products?.map((ele)=>{
                     return (
                        <div key={ele._id} className="g-2 col-4  col-lg-3">
                           <Link to={`productDetails/${ele._id}`}>
                              <div className="card position-relative">
                                 <img src={ele.imgCover.secure_url} alt={ele.title} className="card-img-top"  height={100}/>
                                 <div className="card-body text-center">
                                    <h2 className="card-title h6">{ele.title.split(" ").slice(0,2).join(" ")}</h2>
                                    <p className="card-text">{ele.description}</p>
                                 </div>
                              </div>
                           </Link>
                        </div>
                     )
                  })}

               </>}
            </div> 

            <Pagination handlePageClick={handlePageClick} />

         </div> 

      </>
   )
}
