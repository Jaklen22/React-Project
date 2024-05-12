import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Product from './components/Product/Product';
import Category from './components/Category/Category';
import Signin from './components/Signin/Signin';
import SignUp from './components/SignUp/SignUp';
import NotFound from './components/NotFound/NotFound';
import Cart from './components/Cart/Cart';
import UserContextProvider from './context/TokenContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Brands from './components/Brands/Brands';
import Details from './components/Details/Details';
import CartContextProvider from './context/CartContext';
import { ToastContainer} from 'react-toastify';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ReasetPassword from './components/ReasetPassword/ReasetPassword';

const router  = createBrowserRouter([
  {path:'' , element:<Layout/>,children:[
    {path:'' ,element :<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'home' ,element :<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'product' ,element :<ProtectedRoute><Product/></ProtectedRoute>},
    {path:'category' ,element :<ProtectedRoute><Category/></ProtectedRoute>},
    {path:'brands' ,element :<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'cart' ,element :<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'checkout' ,element :<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'allorders' ,element :<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:'forgetpassword' ,element :<ForgetPassword/>},
    {path:'resetpassword' ,element :<ReasetPassword/>},

    {path:'detials/:id' ,element :<ProtectedRoute><Details/></ProtectedRoute>},
    {path:'signin' ,element :<Signin/>},
    {path:'signup' ,element :<SignUp/>},
    {path:'*' ,element :<NotFound/>},
  ]}
])

function App() {
  return (
  <CartContextProvider>
  <UserContextProvider>
  <RouterProvider router={router}>
  </RouterProvider>
  <ToastContainer theme='colored' />
  </UserContextProvider>
  </CartContextProvider>
  );
}

export default App;
