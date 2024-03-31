import React from 'react'
import image1 from "../../Assets/images/1.jpeg";
import image2 from "../../Assets/images/2.jpeg";
import image3 from "../../Assets/images/3.jpeg";






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
                     <div class="carousel-item">
                        <img src={image3}  class="d-block w-100 imageCover" alt="..."/>
                     </div>
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
