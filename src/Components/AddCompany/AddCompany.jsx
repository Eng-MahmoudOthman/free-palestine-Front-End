import axios from 'axios';
import React, { useState } from 'react'
import { Formik , Form , ErrorMessage, Field } from 'formik';
import toast from 'react-hot-toast';


export default function AddCompany() {
   const [selectedFile, setSelectedFile] = useState(null);
   const [error, setError] = useState(null);
   const [isLoadingAdded, setIsLoadingAdded] = useState(false);
   const token = localStorage.getItem("token")


      async function getData(file , values){
         setIsLoadingAdded(true)
         const formData = new FormData()
         let headers ={ 'enctype' :'multipart/form-data' , token} ;
         

         formData.append('name' , values.name);
         formData.append('description' , values.description);

         formData.append('file',file )
         axios.post("https://free-palestine-back-end.onrender.com/api/v1/company" ,formData,{headers})
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
         if (!values.name) {
            errors.name = 'Input name is required';
         }

         if (!values.description) {
            errors.description = 'Input description is required';
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
                  name:"" ,
                  description:"" ,
               }} validate={validateForm}
               onSubmit={(values) => {getData(selectedFile , values)}}>
               {({ isSubmitting, setFieldValue }) => (
                  
                  <Form className='w-75 m-auto'>
                     <h1 className='main-header'>Add New Company</h1>
                     {  error? <div className='alert alert-danger mt-5' >{error}</div> : ""}


                     <div  className='mt-2'> 
                           <label htmlFor="name" className="form-label">Add Company Name</label>
                           <Field type="text" className="form-control"  name="name" id="name" />
                           {/* {selectedFile && <p>name: {selectedFile.name}</p>} */}
                           <ErrorMessage name="name" component="div" className="text-danger" />
                     </div>



                     <div  className='mt-2'> 
                           <label htmlFor="description" className="form-label">Add description </label>
                           <Field type="text" className="form-control"  name="description" id="description" />
                           {/* {selectedFile && <p>description: {selectedFile.description}</p>} */}
                           <ErrorMessage name="description" component="div" className="text-danger" />
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
