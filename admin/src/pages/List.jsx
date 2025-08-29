import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // Fetch product list
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products || []); // ✅ match backend key
      } else {
        toast.error(response.data.message);
        setList([]); // fallback empty
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setList([]);
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // refresh list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 font-semibold">ALL PRODUCTS LIST</p>
      <div className="flex flex-col gap-2">
        {/* ----------------List Table Title---------------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 bg-gray-100 text-sm font-medium">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* -------------Product list------------- */}
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={item._id || index}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border p-2 text-sm"
            >
              <img
                src={item.image?.[0] || "/placeholder.png"} // ✅ safe access
                alt={item.name || "Product"}
                className="w-16 h-16 object-cover"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <div className="text-center">
                <p
                  onClick={() => removeProduct(item._id)}
                  className="text-right md:text-center cursor-pointer text-lg text-red-600"
                >
                  ✕
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No products available</p>
        )}
      </div>
    </>
  );
};

export default List;
