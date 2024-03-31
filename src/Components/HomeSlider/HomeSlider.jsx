import React from 'react'
import image1 from "../../Assets/images/a1.jpg";
import image2 from "../../Assets/images/a2.jpg";
// import image3 from "../../Assets/images/a3.jpg";
import image4 from "../../Assets/images/a4.jpg";
// import image5 from "../../Assets/images/a5.jpeg";
import image6 from "../../Assets/images/a6.jpg";
import image7 from "../../Assets/images/a7.jpg";
import image8 from "../../Assets/images/a8.jpg";
import image9 from "../../Assets/images/a9.jpg";
import image10 from "../../Assets/images/a10.jpg";
// import image11 from "../../Assets/images/a11.jpeg";






export default function HomeSlider() {


   return (
      <>
         <h1 className="main-header text-center my-5">Welcome To Free Palestine</h1>

         <div className="container-fluid">
            <div className="row">
               <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                     <div class="carousel-item active">
                        <img src={image1} class="d-block w-100 imageCover" alt="..."/>
                     </div>
                     <div class="carousel-item">
                        <img src={image2}  class="d-block w-100 imageCover" alt="..."/>
                     </div>
                     {/* <div class="carousel-item">
                        <img src={image3}  class="d-block w-100 imageCover" alt="..."/>
                     </div> */}
                     <div class="carousel-item">
                        <img src={image4}  class="d-block w-100 imageCover" alt="..."/>
                     </div>
                     {/* <div class="carousel-item">
                        <img src={image5}  class="d-block w-100 imageCover" alt="..."/>
                     </div> */}
                     <div class="carousel-item">
                        <img src={image6}  class="d-block w-100 imageCover" alt="..."/>
                     </div>
                     <div class="carousel-item">
                        <img src={image7}  class="d-block w-100 imageCover" alt="..."/>
                     </div>
                     <div class="carousel-item">
                        <img src={image8}  class="d-block w-100 imageCover" alt="..."/>
                     </div>
                     <div class="carousel-item">
                        <img src={image9}  class="d-block w-100 imageCover" alt="..."/>
                     </div>
                     <div class="carousel-item">
                        <img src={image10}  class="d-block w-100 imageCover" alt="..."/>
                     </div>
                     {/* <div class="carousel-item">
                        <img src={image11}  class="d-block w-100 imageCover" alt="..."/>
                     </div> */}
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
                     <span class="visually-hidden">Next</span>
                  </button>
               </div>
            </div>
         </div>


      </>
   )
} 
