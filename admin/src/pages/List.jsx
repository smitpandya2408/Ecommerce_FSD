import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch product list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products || []);
      } else {
        toast.error(response.data.message || "Failed to load products");
        setList([]);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error(error.response?.data?.message || "Server Error");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove product
  const removeProduct = async (id) => {
    if (!token) return toast.error("Unauthorized: No admin token found");
    if (!id) return toast.error("Product ID missing");

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ safer header format
      );

      if (response.data.success) {
        toast.success(response.data.message || "Product removed successfully");
        fetchList(); // ✅ Refresh list without await
      } else {
        toast.error(response.data.message || "Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error(error.response?.data?.message || "Server Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="mb-3 text-lg font-semibold">All Products List</p>

      {/* ---------------- Loader ---------------- */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading products...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {/* ---------------- List Table Header ---------------- */}
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 bg-gray-100 text-sm font-medium rounded-md">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className="text-center">Action</b>
          </div>

          {/* ---------------- Product List ---------------- */}
          {Array.isArray(list) && list.length > 0 ? (
            list.map((item, index) => (
              <div
                key={item._id || index}
                className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border p-2 rounded text-sm hover:bg-gray-50 transition-all"
              >
                <img
                  src={item.image?.[0] || "/placeholder.png"}
                  alt={item.name || "Product"}
                  className="w-16 h-16 object-cover rounded"
                />
                <p className="truncate">{item.name || "Unnamed Product"}</p>
                <p className="capitalize">{item.category || "Uncategorized"}</p>
                <p>
                  {currency}
                  {item.price || 0}
                </p>
                <div className="text-center">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="text-red-600 hover:text-red-800 text-lg font-bold cursor-pointer"
                    title="Remove product"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">
              No products available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
