// import { createContext } from "react";
// import { products } from "../assets/frontend_assets/assets";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = "$"; // fixed typo from "currancy"
//   const delivery_fee = 10;

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children} {/* fixed typo from childern to children */}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;
import { createContext,  useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartitems, setCartitems] = useState({});
  const navigate = useNavigate()

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
  const getCartCount = () => {
  let totalCount = 0;
  for (const items in cartitems) {
    for (const item in cartitems[items]) {
      try {
        if (cartitems[items][item] > 0) {
          totalCount += cartitems[items][item];
        }
      } catch (error) {
       console.log(error)
      }
    }
  }
  return totalCount;
};


  const updateQuantity =async(itemId,size,quantity)=>{
    let cartData =structuredClone(cartitems)
    cartData[itemId][size]=quantity
    setCartitems(cartData)
  }

  const getCartAmount =()=>{
    let totalAmount=0;
    for(const items in cartitems){
      let itemInfo =products.find((products)=>products._id===items)
      for(const item in cartitems[items]){
        try {
          if(cartitems[items][item]>0){
            totalAmount+=itemInfo.price*cartitems[items][item]
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    return totalAmount
  }

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
    getCartAmount,navigate
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
