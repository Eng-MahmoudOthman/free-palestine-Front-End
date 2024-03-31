import { useContext, useEffect } from "react" ;
import { Link , NavLink, useNavigate } from "react-router-dom" ;
import logo from "../../Assets/images/logo copy.svg" ;
import { UserContext } from "../../Context/UserContext.js";
import avatar from "../../Assets/images/profile 1.png"
import { ProductContext } from "../../Context/ProductContext.js";

export default function Navbar(){

   const navigate = useNavigate() ;
   const {user , setUser , userToken , setUserToken , admin , setAdmin , moderator ,  setModerator , setProductSpecificUser} = useContext( UserContext )
   const {activeProductFun , rejectedProductFun ,  notActiveProducts ,  products  ,  resultCount ,  loading  ,  error  ,  setError  ,  getNotActiveProduct} = useContext(ProductContext)

   useEffect(() => {
      getNotActiveProduct()
   }, [])

   function logOut(){
      localStorage.clear() ;
      setUser({}) ;
      setUserToken("") ;
      setAdmin(false)
      setModerator(false)
      setProductSpecificUser([])
      navigate("/login")
   }

   return (
      <>
         <nav className="navbar navbar-expand-lg bg-body-tertiary p-0 navbarContainer fixed-top mb-5">
               <div className="container">
                  <Link className="navbar-brand text-black" to="/"><img src={logo} alt="logo" className="w-100 h-100 logo" /></Link>
                  <button  class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">


            {/* {true? <> */}
            {userToken? <>

                  {admin || moderator?<>
                           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                              <li className="nav-item">
                                 <NavLink className="nav-link" aria-current="page" to="/"><i class="fa-solid fa-house"></i> <span >Home</span></NavLink>
                              </li>
                              
                              <li className="nav-item">
                                 <NavLink className="nav-link" to="/category"><i class="fa-solid fa-layer-group"></i><span >Categories</span></NavLink>
                              </li>

                              {/* <li className="nav-item">
                                 <NavLink className="nav-link" to="/profile"><i class="fa-solid fa-user"></i><span >Profile</span></NavLink>
                              </li> */}

                              <li className="nav-item">
                                 <NavLink className="nav-link" to="/about"><i class="fa-solid fa-address-card"></i><span >About</span></NavLink>
                              </li>
                              <li className="nav-item">
                                 <NavLink className="nav-link" to="/addProduct"><i class="fa-solid fa-user-plus"></i><span >Add Product</span></NavLink>
                              </li>
                           </ul>


                           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                 <li className="d-flex justify-content-center align-items-center ">
                                    <Link className="userName " to="/profile">
                                       <div className="d-inline-block position-relative">
                                          {notActiveProducts?.length? <>
                                             <span className="position-absolute notification p-1">{notActiveProducts?.length}</span>
                                          </> : <></>}
                                          
                                          
                                          <img className="imgCover" src={avatar} alt="" />
                                       </div>
                                       {user.name?.split(" ").slice(0,2).join(" ")}
                                    </Link>
                                 </li>
                                 <Link className="btn btn-outline-primary btn-sm navBtn" to="/dashboard"><i class="fa-solid fa-chart-line"></i><span >Dashboard</span></Link>
                                 <button onClick={logOut} className="btn btn-outline-success btn-sm navBtn"><i class="fa-solid fa-arrow-right-from-bracket"></i><span >LogOut</span></button>
                           </ul>                  
                  
                  </> : <> 
                  
                           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                 <NavLink className="nav-link" aria-current="page" to="/"><i class="fa-solid fa-house"></i> <span >Home</span></NavLink>
                              </li>
                              
                              <li className="nav-item">
                                 <NavLink className="nav-link" to="/category"><i class="fa-solid fa-layer-group"></i><span >Categories</span></NavLink>
                              </li>

                              <li className="nav-item">
                                 <NavLink className="nav-link" to="/profile"><i class="fa-solid fa-user"></i><span >Profile</span></NavLink>
                              </li>

                              <li className="nav-item">
                                 <NavLink className="nav-link" to="/about"><i class="fa-solid fa-address-card"></i><span >About</span></NavLink>
                              </li>
                              <li className="nav-item">
                                 <NavLink className="nav-link" to="/addProduct"><i class="fa-solid fa-user-plus"></i>Add Product</NavLink>
                              </li>

                           </ul>


                           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
                              <li className="d-flex justify-content-center align-items-center">
                                 <Link className="userName" to="/profile"><img className="imgCover" src={avatar} alt="" />{user.name.split(" ").slice(0,2).join(" ")}</Link>
                              </li>
                              <button onClick={logOut} className="btn btn-outline-success navBtn mx-2">LogOut</button>
                           </ul>
                  
                  </>}



            </> : <>
                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                           <NavLink className="nav-link" aria-current="page" to="/"><i class="fa-solid fa-house xxx"></i> <span >Home</span></NavLink>
                        </li>
                        
                        <li className="nav-item">
                           <NavLink className="nav-link" to="/category"><i class="fa-solid fa-layer-group"></i><span >Categories</span></NavLink>
                        </li>

                        <li className="nav-item">
                           <NavLink className="nav-link" to="/about"><i class="fa-solid fa-address-card"></i><span >About</span></NavLink>
                        </li>
                     </ul>


                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                           <Link className="btn btn-outline-primary btn-login m-2" to="/register">Register</Link>
                           <Link className="btn btn-outline-success btn-login m-2" to="/login">Login</Link>
                     </ul>
                  </>}

                  </div>
               </div>
         </nav> 
      </>
   )
}