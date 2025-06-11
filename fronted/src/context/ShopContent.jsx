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

import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const value = {
    products,
    currency,
    delivery_fee,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
