import avatar from "../../Assets/images/profile.webp" ;

// import image1 from "../../Assets/images/prod1.jpeg" ;
// import image2 from "../../Assets/images/prod2.jpeg" ;
// import image3 from "../../Assets/images/prod3.jpeg" ;
// import image4 from "../../Assets/images/prod4.jpeg" ;
// import image5 from "../../Assets/images/prod5.jpeg" ;
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext.js";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";



export default function ProfileUser(){


   const {user , getProductsSpecificUser , productSpecificUser , setProductSpecificUser} = useContext(UserContext) ;

   async function sendCode (){
      console.log("Send Code");


      const header = {
         token:localStorage.getItem("token")
      }
      let {data} = await axios.post("http://localhost:5000/api/v1/auth/sendCode" ,{} , { headers:header})
      .catch((error)=>{
         toast.error(error.response.data.message)
      })


      //^Check Login Success User :
      if(data.message === "success"){
         toast.success("Success")
      }
   }



   useEffect(() => {
      const token = localStorage.getItem("token");
      let decoded = jwtDecode(token);
      getProductsSpecificUser(decoded.userId)
   }, [])

   return (
      <>
         <h1 className="main-header">User Profile</h1>

         <div className="container">

            <div className="row">
               <div className="col-4 offset-4 text-center">
                  <div className="w-50 m-auto">
                     <img src={avatar} alt="image Profile" className="w-100 h-100" />
                  </div>
               </div>
            </div>

            <div className="row">
               <div className="col-12 text-center">
                  <div className="">
                     <h2 className="my-4 text-capitalize">{user.name}</h2>
                     <div >
                        <Link className="text-white" to={"/editProfile"}><button className="btn bg-color w-75 my-2"><i class="fa-regular fa-pen-to-square me-3"></i>Edit Profile</button></Link>
                        {user.confirmedEmail? <></> : <>
                           <Link to={"/confirmedEmail"}><button className="btn bg-color w-75 my-2" onClick={()=>{sendCode()}}><i class="fa-regular fa-pen-to-square me-3"></i>Please Confirm Email Now </button></Link>
                        </>}
                     </div>
                     <div className="my-4 text-start">
                        <p className="ms-5"> <i class="fa-solid fa-envelope me-2"></i>{user.email}</p>
                        <p className="ms-5"> <i class="fa-solid fa-phone-volume me-2"></i>{user.phone}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="row mt-5 text-center">
                  {productSpecificUser?.map((ele)=>{
                     return (
                        <>
                           {ele.active?
                              <>
                                 <div key={ele._id} className="col-md-2 col-4 mt-4 ">
                                    <div className=" border border-1">
                                       <div className="" >
                                          <img src={ele.imgCover.secure_url} alt={ele.title} className="w-100" />
                                       </div>

                                       <div className="p-2">
                                          <h2 className="head-profile">{ele.title.split(" ").slice(0,2).join(" ")}</h2>
                                          <p className="profile-p">{ele.description}</p>
                                       </div>
                                    </div>
                                 </div>
                              
                              </> : <>
                                 {ele.isProcess?<>
                                    <div className="col-md-2 col-4 mt-4 position-relative card-deleted">
                                       <div className=" border border-1">
                                          <div className="" >
                                             <img src={ele.imgCover.secure_url} alt={ele.title} className="w-100" />
                                          </div>
                                          <div className="p-2">
                                             <h2 className="head-profile">{ele.title.split(" ").slice(0,2).join(" ")}</h2>
                                             <p className="profile-p">{ele.description}</p>
                                          </div>
                                       </div>
                                       <div className="position-absolute icon-deleted ">
                                          <i class="fa-solid fa-xmark text-warning icon"></i>
                                          <span className="fs-5 fw-bold text-warning">Wait Processing</span>
                                       </div>
                                    </div>
                                 </> : <>
                                    <div className="col-md-2 col-4 mt-4 position-relative card-deleted">
                                       <div className=" border border-1">
                                          <div className="" >
                                             <img src={ele.imgCover.secure_url} alt={ele.title} className="w-100" />
                                          </div>
                                          <div className="p-2">
                                             <h2 className="head-profile">{ele.title.split(" ").slice(0,2).join(" ")}</h2>
                                             <p className="profile-p">{ele.description}</p>
                                          </div>
                                       </div>
                                       <div className="position-absolute icon-deleted ">
                                          <i class="fa-solid fa-xmark  icon"></i>
                                          <span className="fs-5 fw-bold text-danger">REJECTED</span>
                                       </div>
                                    </div>
                                 </>}

                              
                              </>}
                        </>)
                  })}
            </div>

         </div>

      </>
   )
} 