import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading.jsx';
import { CategoryContext } from '../../Context/CategoryContext.js';

export default function Products() {

   
   const [products, setProducts] = useState([]) ;
   const [loading, setLoading] = useState(false) ;
   const [error, setError] = useState("") ;
   const params = useParams() ;


   const {categoryName ,   getCategoryName} = useContext(CategoryContext)





   async function getData(){
      setLoading(true)
      let response =   await axios.get(`https://free-palestine-back-end.onrender.com/api/v1/categories/${params.id}/products` )
      .catch((error)=>{
         // console.log(error.response?.data.message);

         toast.error(error.response?.data.message);
         setError(error.response?.data.message);
         setLoading(false)
      });

      if(response?.data.message === "success"){
         // console.log(response.data.products);
         // console.log(response.data.message);
         toast.success(response?.data.message);
         setProducts(response.data.products);
         setLoading(false)
      }

   }


   //Component DidMount :
   useEffect(()=>{
      getData()
      getCategoryName(params.id)
   } , [])

   
   return (
      <Fragment>
         <div className="container">
            <h1 className='text-center main-color my-4'>Product in {categoryName}</h1>
            <div className="row">
            {loading?<Loading/> : 

               !error? 
               <>
                  {products.map((ele)=>{
                  return (
                     <div className="g-2 col-4  col-lg-3" key={ele._id}>
                        <Link to={`/productDetails/${ele._id}`}>
                           <div className="card">
                              <img src={ele.imgCover.secure_url} className="card-img-top"  height={100} alt="..." />
                              <div className="card-body">
                                 <h5 className="card-title">{ele.title.split(" ").slice(0,2).join(" ")}</h5>
                                 <p className="card-text">Some quick example text to .</p>
                              </div>
                           </div>
                        </Link>
                     </div>
                  )
               })}
               </> : <div className='alert alert-danger w-75 justify-content-center'>{error}</div>
            }
            </div>
         </div>
      </Fragment>

   )
}






