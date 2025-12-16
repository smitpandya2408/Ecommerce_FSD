import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartitems, setCartitems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Get available quantity for a specific size
  const getAvailableQuantity = (productId, size) => {
    const product = products.find(p => p._id === productId);
    if (!product) return 0;
    
    // Check if sizeQuantities exists and has the size
    if (product.sizeQuantities && product.sizeQuantities.length > 0) {
      const sizeData = product.sizeQuantities.find(item => item.size === size);
      return sizeData ? sizeData.quantity : 0;
    }
    
    // Fallback to checking sizes array
    return product.sizes && product.sizes.includes(size) ? 1 : 0;
  };

  // Check if a product is in stock
  const isInStock = (productId, size) => {
    return getAvailableQuantity(productId, size) > 0;
  };

  // Add to cart with quantity check
  const addtocart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    // Check if the selected size is in stock
    if (!isInStock(itemId, size)) {
      toast.error("Selected size is out of stock");
      return;
    }

    const cartData = JSON.parse(JSON.stringify(cartitems));
    const currentQty = cartData[itemId]?.[size] || 0;
    const availableQty = getAvailableQuantity(itemId, size);

    // Check if we can add more items to cart
    if (currentQty >= availableQty) {
      toast.error(`Only ${availableQty} items available in this size`);
      return;
    }

    // Update cart
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartitems(cartData);

    // Sync with backend if user is logged in
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Item added to cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error(error.response?.data?.message || "Failed to add to cart");
        // Revert local cart state on error
        setCartitems(prev => ({
          ...prev,
          [itemId]: {
            ...prev[itemId],
            [size]: (prev[itemId]?.[size] || 1) - 1
          }
        }));
      }
    }
  };

  // Get total items in cart
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

  // Update quantity with stock check
  const updateQuantity = async (itemId, size, newQuantity) => {
    // Validate quantity
    if (newQuantity < 0) return;
    
    const availableQty = getAvailableQuantity(itemId, size);
    if (newQuantity > availableQty) {
      toast.error(`Only ${availableQty} items available in this size`);
      return;
    }

    const cartData = JSON.parse(JSON.stringify(cartitems));
    
    // If quantity is 0, remove the size from cart
    if (newQuantity === 0) {
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        // If no more sizes for this item, remove the item
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      // Update quantity
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = newQuantity;
    }
    
    setCartitems(cartData);

    // Sync with backend if user is logged in
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity: newQuantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error(error.response?.data?.message || "Failed to update cart");
        // Re-fetch cart from server to stay in sync
        if (token) {
          await getUserCart(token);
        }
      }
    }
  };

  // Calculate total amount with validation
  const getCartAmount = () => {
    let totalAmount = 0;
    
    // If no cart items, return 0
    if (!cartitems || Object.keys(cartitems).length === 0) {
      return 0;
    }
    
    // If no products loaded, return 0
    if (!Array.isArray(products) || products.length === 0) {
      console.warn('No products available for cart calculation');
      return 0;
    }
    
    try {
      for (const itemId in cartitems) {
        const itemInfo = products.find((p) => p._id === itemId);
        
        // Skip if item not found or has no price
        if (!itemInfo || typeof itemInfo.price === 'undefined') {
          console.warn(`Item not found or has no price: ${itemId}`);
          continue;
        }
        
        // Parse price as float
        const price = parseFloat(itemInfo.price);
        if (isNaN(price)) {
          console.warn(`Invalid price for item ${itemId}:`, itemInfo.price);
          continue;
        }
        
        // Process each size/quantity
        for (const size in cartitems[itemId]) {
          const quantity = parseInt(cartitems[itemId][size], 10);
          if (quantity > 0) {
            totalAmount += price * quantity;
          }
        }
      }
      return totalAmount;
    } catch (error) {
      console.error('Error calculating cart amount:', error);
      return 0; // Return 0 in case of any error
    }

  };

  // Fetch products
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

  // Fetch user cart
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setCartitems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Load products once
  useEffect(() => {
    getProductsData();
  }, []);

  // Restore token & fetch cart
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartitems,
    setCartitems,
    addtocart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    getAvailableQuantity,
    isInStock,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
