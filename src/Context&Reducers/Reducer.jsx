export const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case "ADD_COMPANY":
      return {
        ...state,
        companies: [...state.companies, action.payload],
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "GET_COMPANIES":
      return {
        ...state,
        companies: action.payload,
      };

    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.filter((pro) =>
          pro.name.toLowerCase().includes(state.search)
        ),
      };

    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };

    case "SET_EDITING_CAT":
      return {
        ...state,
        editingCat: true,
        editCat: action.payload,
      };

    case "EDIT_CATEGORY":
      const { _id, name, isActive } = action.payload;
      state.categories.forEach((element) => {
        if (element._id === _id) {
          element.name = name;
          element.isActive = isActive;
        }
      });

      return {
        ...state,
        categories: state.categories,
        editingCat: false,
        editCat: {},
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "SET_EDITING_COMP":
      return {
        ...state,
        editingComp: true,
        editComp: action.payload,
      };

    case "EDIT_COMPANY":
      const { compId, compName, isProductsAvalaible } = action.payload;
      state.companies.forEach((element) => {
        if (element._id === compId) {
          element.name = compName;
          element.isProductsAvalaible = isProductsAvalaible;
        }
      });

      return {
        ...state,
        companies: state.companies,
        editingComp: false,
        editComp: {},
      };

    case "DELETE_COMPANY":
      return {
        ...state,
        companies: state.companies.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "EDIT_PRODUCT":
      const {
        pro_name,
        description,
        category,
        company,
        price,
        quantity,
        featured,
        image,
        pro_id,
      } = action.payload;

      for (let i of state.products) {
        if (i._id === pro_id) {
          i.name = pro_name;
          i.description = description;
          i.category = category;
          i.company = company;
          i.price = price;
          i.quantity = quantity;
          i.featured = featured;
          i.image = image;
        }
      }

      return {
        ...state,
        products: state.products,
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((pro) => pro._id !== action.payload),
      };

    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};
