import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartitems, setCartitems] = useState({});
  const [products, setProducts] = useState([]);
  const [token,setToken]=useState('')
  const navigate = useNavigate();

  // ✅ Add to cart
  const addtocart = (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    const cartData = JSON.parse(JSON.stringify(cartitems));
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartitems(cartData);
  };

  // ✅ Get total items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartitems) {
      for (const item in cartitems[items]) {
        try {
          if (cartitems[items][item] > 0) {
            totalCount += cartitems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  // ✅ Update quantity in cart
  const updateQuantity = (itemId, size, quantity) => {
    const cartData = structuredClone(cartitems);
    cartData[itemId][size] = quantity;
    setCartitems(cartData);
  };

  // ✅ Calculate cart total
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartitems) {
      let itemInfo = products.find((p) => p._id === items);
      if (!itemInfo) continue; // ✅ skip if product not found
      for (const item in cartitems[items]) {
        try {
          if (cartitems[items][item] > 0) {
            totalAmount += itemInfo.price * cartitems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  // ✅ Fetch products from backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    }
  };

  // ✅ Fetch only once on mount
  useEffect(() => {
    getProductsData();
  }, []);

 useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
  }, []);


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartitems,
    addtocart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
