
import React, { useContext, useEffect, useState } from 'react';
import { Formik , Form , ErrorMessage, Field } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CategoryContext } from '../../Context/CategoryContext.js';
import { CompanyContext } from '../../Context/CompanyContext.js';

export default function AddProduct() {

   const [selectedFile, setSelectedFile] = useState(null);
   const [error, setError] = useState(null);
   const [isLoadingAdded, setIsLoadingAdded] = useState(false);
   const token = localStorage.getItem("token")




   const {category , getCategory , errorCategory} = useContext(CategoryContext)
   const {company , getCompany , errorCompany} = useContext(CompanyContext)


   useEffect(() => {
      getCategory()
      getCompany()
   }, [])
   


   async function getData(file , values){
      setIsLoadingAdded(true)
      const formData = new FormData()
      let headers ={ 'enctype' :'multipart/form-data' , token} ;
      

      formData.append('title' , values.title);
      formData.append('description' , values.description);
      formData.append('company' , values.company);
      formData.append('category' , values.category);


      formData.append('file',file )
      axios.post("http://localhost:5000/api/v1/products" ,formData,{headers})
      .then((response)=>{
         setIsLoadingAdded(false)
         toast.success(response.data?.message);
         setTimeout(() => {
            window.location.reload()
         }, 1000);
      })
      .catch((error)=>{
         setIsLoadingAdded(false)
         toast.error(error.response?.data?.message)
         setError(error.response?.data?.message)
         setTimeout(() => {
            window.location.reload()
         }, 4000);
      })
   }

   const validateForm = (values) => {
      const errors = {};
      //^ Validate title field :
      if (!values.title) {
         errors.title = 'Input title is required';
      }

      //^ Validate description field :
      if (!values.description) {
         errors.description = 'Input description is required';
      }

      //^ Validate company field :
      if (!values.company) {
         errors.company = 'Input company is required';
      }

      //^ Validate category field :
      if (!values.category) {
         errors.category = 'Input category is required';
      }

      //^ Validate image field :
      if (!values.file) {
         errors.file = 'Input image is required';
      }
      // console.log(errors);
      return errors;
   };

      return (
         <Formik
               initialValues={{
                  file: null ,
                  title:"" ,
                  description :"",
                  company :"" ,
                  category:""
               }} validate={validateForm}
               onSubmit={(values) => {getData(selectedFile , values)}}>
               {({ isSubmitting, setFieldValue }) => (
                  
                  <Form className='w-75 m-auto'>
                     <h1 className='main-header'>Add New Products</h1>
                     {  error? <div className='alert alert-danger mt-5' >{error}</div> : ""}
                     {  error? <div className='alert alert-danger mt-5' >{errorCategory}</div> : ""}
                     {  error? <div className='alert alert-danger mt-5' >{errorCompany}</div> : ""}


                     <div  className='mt-2'>
                           <label htmlFor="title" className="form-label">Add Title</label>
                           <Field type="text" className="form-control"  name="title" id="title" />
                           {/* {selectedFile && <p>Title: {selectedFile.name}</p>} */}
                           <ErrorMessage name="title" component="div" className="text-danger" />
                     </div>


                     <div  className='mt-4'>
                           <label htmlFor="description" className="form-label">Add Description</label>
                           <Field type="text"  name="description" id="description" className="form-control"/>
                           {/* {selectedFile && <p>Description: {selectedFile.name}</p>} */}
                           <ErrorMessage name="description" component="div" className="text-danger" />
                     </div>


                     <div className='mt-4'>
                        <label htmlFor="category" className="form-label">Category</label>
                        <Field name="category" as="select" id="category" className="form-control">
                        <option value="">Select Category</option>
                        { console.log( "category" ,category)}

                        {category? category.map((ele)=>{
                           return (
                              <option  key={ele._id} value={ele._id}>{ele.name}</option>
                           )
                        }) : <h1>Error Category</h1>}
                        </Field>
                        <ErrorMessage name="company" component="div"  className="alert alert-danger p-2 mt-4"  />
                     </div>


                     <div className='mt-4'>
                        <label htmlFor="company" className="form-label">Company</label>
                        <Field name="company" as="select" id="company" className="form-control">
                           <option value="">Select Company</option> 
                           {console.log("company" , company)}
                           {company? company.map((ele)=>{
                              return (
                                 <option  key={ele._id} value={ele._id}>{ele.name}</option>
                              )
                           }) : <h1>Error Company</h1>}
                        </Field>
                        <ErrorMessage name="category" component="div"  className="alert alert-danger p-2 mt-4"  />
                     </div>



                     <div className='mt-4'>
                           <label htmlFor="image" className="form-label">Upload Image:</label>
                           <input type="file" className="text-danger form-control" onChange={(event) => {setSelectedFile(event.target.files[0]);setFieldValue('file', event.target.files[0]);}}/>
                           {/* {selectedFile && <p>Selected File: {selectedFile.name}</p>} */}
                           <ErrorMessage name="file" component="div" className="text-danger" />
                     </div>

                     <div className='d-flex justify-content-center mt-4 '>
                        {isLoadingAdded? <>

                           <button type=" button"  className="btn bg-color w-50">
                              <i className='fas fa-spinner fa-spin fs-4'/>
                           </button>

                        </> : <>
                        <button type="submit" disabled={isSubmitting} className="btn bg-color w-50">Submit</button>
                        </>}
                     </div>

                  </Form>
               )}
         </Formik>
    );
}
