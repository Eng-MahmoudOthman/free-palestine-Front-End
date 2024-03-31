import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../Context/ProductContext.js'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function GetAllProductsAdmin() {
	const { products ,  getData , loading , error , setError , resultCount , getDataSearch } = useContext(ProductContext)

	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [allProductsAdmin , setAllProductsAdmin] = useState([]) ;



	// function searchInput (e){
	// 	// if(e.target.value === ""){
	// 	//    setError(null)
	// 	// }
	// 	getDataSearch((e.target.value).toLowerCase())
	// }


   //& Get All Product in DashBoard Admin :
   async function getAllProductsAdmin(){
      // setLoading(true)
      let response =   await axios.get(`http://localhost:5000/api/v1/products`)
      .catch((error)=>{
         // console.log(error.response?.data.message);
         setError(error.response?.data.message);
         // setLoading(false)
      })
      if(response?.data.message === "success"){
         // console.log(response);
         // console.log(response.data.products);
         // setMetadata(response.data.metadata);
         setAllProductsAdmin(response.data.products);
         // setResultCount(response.data?.results)
         // setLoading(false)
      }
   }



	async function deleteProduct (e , id){
		if (window.confirm("Are You Sure Delete Product") === true) {
			setIsLoading(true)
			let header = {
				token:localStorage.getItem("token"),
			};
	
			let response =   await axios.delete(`http://localhost:5000/api/v1/products/${id}` ,  {headers:header} )
			.catch((error)=>{
				console.log(error.response?.data.message);
				setIsError(error.response?.data.message);
				toast.error(error.response?.data.message)
				setIsLoading(false)
			})
			if(response?.data.message === "success"){
				console.log(response);
				toast.success(response?.data.message + " Delete Product")
				setIsLoading(false)
				window.location.reload()
			}
			getAllProductsAdmin()
		} 
	}



	//Component DidMount :
	useEffect(()=>{
		getAllProductsAdmin()
	} , [])
	return (
		<>

			<div className="container">

				<div className="row my-5">
					<div className="col-10 offset-1">
						<form action="">
							<input type="search"   className='form-control w-100 m-auto my-2 ' placeholder='Search By Product Name'  name="search" />
							{/* <input type="search" onChange={(e)=>{searchInput(e)}}  className='form-control w-100 m-auto my-2 ' placeholder='Search By Product Name'  name="search" /> */}
						</form>
					</div>
				</div>


				<div className="row my-5">
					{/* <div className="col-5 offset-1 text-center">
						<h4 className='btn btn-success totalProduct text-white'>Total Products  :  {resultCount} </h4>
					</div> */}
					<div className="col-5 text-center">
						<h4 className='btn btn-success m-auto totalProduct'>Count in Page   :  {allProductsAdmin.length} </h4>
					</div>
				</div>


				<div className="row">
					{isError? <p className="alert alert-danger w-75 ">{isError}</p> : ""}
					{error? <p className="alert alert-danger w-75 ">{error}</p> : <>
					
						{loading || isLoading? <Loading/> : allProductsAdmin?.map((ele)=>{
							return (
								<div key={ele._id} className="g-2 col-4  col-lg-3">
									<div className="card position-relative">
										<img src={ele.imgCover.secure_url} alt={ele.title} className="card-img-top"  height={100}/>
										<div className="card-body text-center">
											<h2 className="card-title h6">{ele.title.split(" ").slice(0,2).join(" ")}</h2>
											{/* <p className="card-text">{ele.description}</p> */}
											<button className='btn btn-danger btn-sm' onClick={(e , id)=>{deleteProduct ( e , ele._id)}}>Deleted</button>
											<Link to={`/reportDetails/${ele._id}`}><button className='btn btn-warning btn-sm m-1'>Reports</button></Link>
										
											
										</div>
									</div>
								</div>
							)
						})}
					
					</>}
				</div> 
			</div> 

		</>
	)
}