import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function GetAllUserAdmin() {

   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [allUsers , setAllUsers] = useState([]) ;



	function searchInput (e){
		// if(e.target.value === ""){
		//    setError(null)
		// }
		// getDataSearch((e.target.value).toLowerCase())
      console.log(e.target.value);
	}

   const header = {
      token:localStorage.getItem("token")
   }

   async function getAllUsers(){
      setIsLoading(true)
      let {data} = await axios.get("https://free-palestine-back-end.onrender.com/api/v1/users" , {} , {headers:header})
      .catch((error)=>{
         // setError(error.response.data.message)
         toast.error(error.response.data.message)
         console.log(error);
         setIsLoading(false)
      })

      if(data.message === "success"){
         // console.log(data.users);
         setAllUsers(data.users)
         setIsLoading(false)
      }
      // console.log(values);
   }


   async function deleteUser(id){
      console.log("delete" , id);
      if (window.confirm("Are You Sure Delete Product") === true) {
			setIsLoading(true)
			let header = {
				token:localStorage.getItem("token"),
			};
	
			let response =   await axios.delete(`https://free-palestine-back-end.onrender.com/api/v1/users/${id}` ,  {headers:header} )
			.catch((error)=>{
				console.log(error.response?.data.message);
				setIsError(error.response?.data.message);
				toast.error(error.response?.data.message)
				setIsLoading(false)
			})
			if(response?.data.message === "success"){
				console.log(response);
				toast.success(response?.data.message + " Delete User")
				setIsLoading(false)
			}
         getAllUsers()
		} 
   }


   function updateUser(id){
      console.log("update" , id);
      navigate(`/updateUser/${id}`)
   }

   useEffect(() => {
      getAllUsers()
   }, [])
   

   return (
      <>
         <div className="container">

            <div className="row my-5">
					<div className="col-10 offset-1">
						<form action="">
                     <input type="search" onChange={(e)=>{searchInput(e)}}  className='form-control w-100 m-auto my-2 ' placeholder='Search By User Name'  name="search" />
						</form>
					</div>
				</div>



            <div className="row">
               {/* {console.log(allUsers)} */}
               {allUsers?.map((ele)=>{
                  return (
                     <>
                        <div className="offset-2 col-8 border border-2 rounded my-2 user-card">
                           <p>Name :{ele.name}</p>
                           <p>Email :{ele.email}</p>
                           <p>Phone : {ele.phone}</p>
                           <div className="d-flex justify-content-around mb-4">
                              <button onClick={(id)=>{deleteUser(ele._id)}} className='btn btn-danger btn-sm'>Delete</button>
                              <button onClick={(id)=>{updateUser(ele._id)}} className='btn btn-success btn-sm'>Blocked</button>
                           </div>
                        </div>
                     </>
                  )
               })}
            </div>
         </div>
      </>
   )
}
