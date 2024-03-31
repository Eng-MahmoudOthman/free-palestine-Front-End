import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import ProductContextProvider from './Context/ProductContext.js';
import UserContextProvider from './Context/UserContext.js';
import CategoryContextProvider from './Context/CategoryContext.js';
import CompanyContextProvider from './Context/CompanyContext.js';
import { QueryClient, QueryClientProvider } from 'react-query';
const root = ReactDOM.createRoot(document.getElementById('root'));

let queryClient = new QueryClient ();
root.render(
  // <React.StrictMode>


   <QueryClientProvider client={queryClient}>
      <CompanyContextProvider>
         <CategoryContextProvider>
            <UserContextProvider>
               <ProductContextProvider>
                     <App />
               </ProductContextProvider>
            </UserContextProvider>
         </CategoryContextProvider>
      </CompanyContextProvider>
   </QueryClientProvider>



  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
