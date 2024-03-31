import { RouterProvider , createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ProfileUser from './Components/UserProfile/UserProfile.jsx';
import About from './Components/About/About.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext.js';
import { jwtDecode } from 'jwt-decode';
import { Toaster } from 'react-hot-toast';
import Category from './Components/Category/Category.jsx';
import AddProduct from './Components/AddProduct/AddProduct.jsx';
import DashBoard from './Components/DashBoard/DashBoard.jsx';
import DashboardHome from './Components/DashboardHome/DashboardHome.jsx';
import DashboardProduct from './Components/DashboardProduct/DashboardProduct.jsx';
import DashboardUser from './Components/DashboardUser/DashboardUser.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import Report from './Components/Report/Report.jsx';
import AllReportAdmin from './Components/AllReportAdmin/AllReportAdmin.jsx';
import GetAllProductsAdmin from './Components/GetAllProductsAdmin/GetAllProductsAdmin.jsx';
import UpdateProductAdmin from './Components/UpdateProductAdmin/UpdateProductAdmin.jsx';
import Products from './Components/Products/Products.jsx';
import EditProfile from './Components/EditProfile/EditProfile.jsx';
import ActiveProduct from './Components/ActiveProduct/ActiveProduct.jsx';
import RejectedProducts from './Components/RejectedProducts/RejectedProducts.jsx';
import EditImageProfile from './Components/EditImageProfile/EditImageProfile.jsx';
import ChangeInfoUser from './Components/ChangeInfoUser/ChangeInfoUser.jsx';
import ChangePassword from './Components/ChangePassword/ChangePassword.jsx';
import ReportDetails from './Components/ReportDetails/ReportDetails.jsx';
import CategoryAdmin from './Components/CategoryAdmin/CategoryAdmin.jsx';
import CategoryDetailsAdmin from './Components/CategoryDetailsAdmin/CategoryDetailsAdmin.jsx';
import AddCategory from './Components/AddCategory/AddCategory.jsx';
import CategoriesAdminHome from './Components/CategoriesAdminHome/CategoriesAdminHome.jsx';
import CompanyAdminHome from './Components/CompanyAdminHome copy/CompanyAdminHome .jsx';
import AddCompany from './Components/AddCompany/AddCompany.jsx';
import CompanyAdmin from './Components/CompanyAdmin/CompanyAdmin.jsx';
import UpdateCompany from './Components/UpdateCompany/UpdateCompany.jsx';
import UpdateCategory from './Components/UpdateCategory/UpdateCategory.jsx';
import ConfirmedEmail from './Components/ConfirmedEmail/ConfirmedEmail.jsx';
import AddUserAdmin from './Components/AddUserAdmin/AddUserAdmin.jsx';
import GetAllUserAdmin from './Components/GetAllUserAdmin/GetAllUserAdmin.jsx';
import UpdateUser from './Components/UpdateUser/UpdateUser.jsx';

let routers = createHashRouter([
// let routers = createBrowserRouter([
	{path:"" , element:<Layout/> , children:[
		{index:true , element:<Home/>} , 
		{path:"login" , element:<Login/>} , 
		{path:"addProduct" , element:<AddProduct/>} , 
		{path:"register" , element:<Register/>} , 
		{path:"profile" , element:<ProtectedRoute> <ProfileUser/> </ProtectedRoute>} , 
		{path:"editProfile" , element:<EditProfile/> , children:[
			{index:true , element:<ChangeInfoUser/>} , 
			{path:"editImageProfile" , element:<EditImageProfile/>} , 
			{path:"changePassword" , element:<ChangePassword/>} , 
		]} ,
		{path:"dashboard" , element:<DashBoard/> , children:[
			{index:true , element: <DashboardHome/>} , 
			{path:"dashboardProduct" , element:<DashboardProduct/>} , 
			{path:"dashboardUsers" , element:<DashboardUser/>} , 
			{path:"allReportAdmin" , element:<AllReportAdmin/>} , 
			{path:"categoriesAdminHome" , element:<CategoriesAdminHome/>} , 
			{path:"companyAdminHome" , element:<CompanyAdminHome/>} , 
			{path:"companyAdmin" , element:<CompanyAdmin/>} , 
			{path:"activeProduct" , element:<ActiveProduct/>} , 
			{path:"rejectedProducts" , element:<RejectedProducts/>} , 
			{path:"categoryAdmin" , element:<CategoryAdmin/>} , 
			{path:"allProductsAdmin" , element:<GetAllProductsAdmin/>} , 
		]} , 
		{path:"addUserAdmin" , element:<AddUserAdmin/>} , 
		{path:"updateUser/:id" , element:<UpdateUser/>} , 
		{path:"getAllUserAdmin" , element:<GetAllUserAdmin/>} , 
		{path:"allReportAdmin" , element:<AllReportAdmin/>} , 
		{path:"getAllProductsAdmin" , element:<GetAllProductsAdmin/>} , 
		{path:"updateProductAdmin" , element:<UpdateProductAdmin/>} , 
		{path:"confirmedEmail" , element:<ConfirmedEmail/>} , 

		{path:"reportProduct/:id" , element:<Report/>} , 
		{path:"productDetails/:id" , element:<ProductDetails/>} , 
		{path:"category/:id/products" , element:<Products/>} , 
		{path:"category" , element:  <Category/>  } , 
		{path:"about" , element:<About/>} , 
		{path:"addCategory" , element:<AddCategory/>} , 
		{path:"addCompany" , element:<AddCompany/>} , 
		{path:"categoryDetailsAdmin/:id" , element:<CategoryDetailsAdmin/>} , 
		{path:"updateCompany/:id" , element:<UpdateCompany/>} , 
		{path:"updateCategory/:id" , element:<UpdateCategory/>} , 
		{path:"reportDetails/:id" , element:<ReportDetails/>} , 
		{path:"*" , element:<NotFound/>} , 
	]}
])

function App() {

const { setUser , setUserToken  , setAdmin , setModerator} = useContext(UserContext)


useEffect(()=>{
		//& Decoded Token :

		if(localStorage.getItem("token") != null){
			setUserToken(localStorage.getItem("token")) ;


		const userToken =  localStorage.getItem('token'); 
			let decoded = jwtDecode(userToken);
			if(decoded.role === "admin") {
			setAdmin(true)
			}else if(decoded.role === "moderator") {
				setModerator(true)
			}

		}


		
		if(localStorage.getItem("user") != null){
			setUser(JSON.parse(localStorage.getItem("user")))
		}
},[])







	return (
		<>

			<RouterProvider router={routers}></RouterProvider>
			<Toaster/>

		</>
	);
}

export default App;



// let header = {
//   token:localStorage.getItem("userToken"),
// };


// //^ Function Add to Cart :
// async function addToCart (productId){
//   // axios.post("url" , {body} , { header});
//   return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,{productId:productId},{headers:header})
//   .then((response)=>response)
//   .catch((error)=>error);
// }
