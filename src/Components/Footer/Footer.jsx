import { Link } from "react-router-dom";


export default function Footer(){


   return (
      <>
         <footer className="bg-dark mt-5 pt-5 text-white text-center">
            <div className="container-fluid p-4 ">
               <h1 className="text-center mb-4">Free Palestine </h1>
               <div className="row">

                  <div className="col-md-12">
                     <p className="footer-info">
                        The boycott holds significant importance in supporting the Palestinian cause. It is a powerful
                        non-violent tool that individuals and organizations can use to exert economic and political pressure 
                        on Israel. By boycotting Israeli products, companies, and institutions, we demonstrate solidarity with 
                        the Palestinians, raise awareness about their plight, and demand justice. The boycott sends a strong message 
                        to Israel that its occupation and human rights violations will not be tolerated. It is a peaceful means to 
                        advocate for the rights of the Palestinian
                        people and to urge Israel to engage in meaningful dialogue for a just and lasting solution
                     </p>
                  </div>

                  <div className="col-md-12">
                     <i className="fa-brands  fa-facebook me-3"></i>
                     <i className="fa-brands  fa-twitter me-3"></i>
                     <i className="fa-brands  fa-telegram me-3"></i>
                     <i className="fa-brands  fa-Youtube"></i>
                     <i className="fa-brands  fa-instagram me-3"></i>
                  </div>
                  
               </div>
            </div>
            <p className=" p-2 m-0 bg-black developer">CopyRight &copy; Developed By : <Link className="main-color" to={"#"}>Mahmoud Othman</Link>   &   UI/UX Design By : <Link className="main-color" to={"#"}>Eman Magdy</Link> </p>
         </footer>
      </>
   )
}