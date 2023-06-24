import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { url } from "../Api";
import { useNavigate } from "react-router-dom";
import { Reducer } from "./Reducer";
import { toast, ToastContainer, Zoom } from "react-toastify";

const AdminContext = createContext();

const initialState = {
  products: [],
  companies: [],
  categories: [],
  editingCat: false,
  editCat: {},
  editingComp: false,
  editComp: {},
  search: "",
  orders: [],
};

const Context = ({ children }) => {
  const [admin, setAdmin] = useState();
  const [state, dispatch] = useReducer(Reducer, initialState);
  const navigate = useNavigate();

  const registerAdmin = async ({ name, email, password, type }) => {
    try {
      const res = await fetch(`${url}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, type }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginAdmin = async ({ email, password }) => {
    try {
      const res = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const addCategory = async ({ name, isActive }) => {
    try {
      const res = await fetch(`${url}/api/category/addCategory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, isActive }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Category Added", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "ADD_CATEGORY", payload: data.cat });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editCategory = async ({ name, isActive, _id }) => {
    try {
      const res = await fetch(`${url}/api/category/updateCategory/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, isActive }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Category Edited", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "EDIT_CATEGORY", payload: data.cat });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCategory = async (_id) => {
    try {
      const res = await fetch(`${url}/api/category/deleteCategory/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Category Deleted", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "DELETE_CATEGORY", payload: _id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addCompany = async ({ name, isProductsAvalaible }) => {
    try {
      const res = await fetch(`${url}/api/company/addCompany`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, isProductsAvalaible }),
      });

      const data = await res.json();
      dispatch({ type: "ADD_COMPANY", payload: data.comp });

      if (data.success) {
        toast.success("Company Added", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const editCompany = async ({ name, isProductsAvalaible, _id }) => {
    try {
      const res = await fetch(`${url}/api/company/updateCompany/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, isProductsAvalaible }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Company Edited", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({
          type: "EDIT_COMPANY",
          payload: {
            compId: data.comp._id,
            compName: data.comp.name,
            isProductsAvalaible: data.comp.isProductsAvalaible,
          },
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCompany = async (_id) => {
    try {
      const res = await fetch(`${url}/api/company/deleteCompany/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Company Deleted", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "DELETE_COMPANY", payload: _id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addProduct = async (pro, image) => {
    const { name, description, category, company, price, quantity, featured } =
      pro;

    try {
      const res = await fetch(`${url}/api/product/addProduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          category,
          company,
          price,
          quantity,
          featured,
          image,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Product Added", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        dispatch({ type: "ADD_PRODUCT", payload: data.pro });
      } else {
        return toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const editProduct = async (
    { name, description, price, quantity, image, category, company, featured },
    _id
  ) => {
    try {
      const res = await fetch(`${url}/api/product/updateProduct/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          category,
          company,
          price,
          quantity,
          featured,
          image,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Product Edited", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        dispatch({
          type: "EDIT_PRODUCT",
          payload: { pro_name: data.pro.name, ...data.pro, pro_id: _id },
        });
      } else {
        return toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const deleteProduct = async (_id) => {
    try {
      const res = await fetch(`${url}/api/product/deleteProduct/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Product Deleted", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        dispatch({
          type: "DELETE_PRODUCT",
          payload: _id,
        });
      } else {
        return toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch(`${url}/api/category/getAllCategories`);
      const data = await res.json();
      dispatch({ type: "GET_CATEGORIES", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCompanies = async () => {
    try {
      const res = await fetch(`${url}/api/company/getAllCompanies`);
      const data = await res.json();
      dispatch({ type: "GET_COMPANIES", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getProducts = async () => {
    try {
      const res = await fetch(`${url}/api/product/getAllProducts`);
      const data = await res.json();
      dispatch({ type: "GET_PRODUCTS", payload: data.data });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOrders = async () => {
    try {
      const res = await fetch(`${url}/api/order/getAllOrders`);
      const data = await res.json();
      dispatch({ type: "GET_ORDERS", payload: data.orders });
    } catch (error) {
      console.log(error.message);
    }
  };

  const setEditCat = (cat) =>
    dispatch({ type: "SET_EDITING_CAT", payload: cat });

  const setEditComp = (comp) =>
    dispatch({ type: "SET_EDITING_COMP", payload: comp });

  useEffect(() => {
    getCategories();
    getCompanies();
    getProducts();
    getOrders();
  }, [state]);

  useEffect(() => {
    const adminInfo = JSON.parse(localStorage.getItem("e-comm-admin"));
    if (adminInfo) setAdmin(adminInfo);
    else navigate("/login")
  }, [navigate]);

  return (
    <AdminContext.Provider
      value={{
        admin,
        registerAdmin,
        loginAdmin,
        ...state,
        dispatch,

        addCategory,
        setEditCat,
        editCategory,
        deleteCategory,

        addCompany,
        editCompany,
        deleteCompany,
        setEditComp,

        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
      <ToastContainer transition={Zoom} />
    </AdminContext.Provider>
  );
};

const useGlobalContext = () => useContext(AdminContext);

export { Context, useGlobalContext };
