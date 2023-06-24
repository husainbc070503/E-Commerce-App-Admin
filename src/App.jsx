import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Components/Index";
import Auth from "./Authentication/Auth";
import { Context } from "./Context&Reducers/Context";
import Navbar from "./Components/Navbar";
import CategoriesIndex from "./Components/Categories/CategoriesIndex";
import 'react-toastify/dist/ReactToastify.css';
import CompaniesIndex from "./Components/Companies/CompaniesIndex";
import AddProduct from "./Components/Products/AddProduct";
import EditProduct from "./Components/Products/EditProduct";
import Orders from "./Components/Orders/Orders";

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/categories" element={<CategoriesIndex />} />
          <Route path="/companies" element={<CompaniesIndex />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
