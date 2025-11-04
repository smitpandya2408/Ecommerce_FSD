import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContent";
import Login from "./Login";

const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } } // ✅ Fixed
      );

      if (response.data.success && response.data.orders.length > 0) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items?.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status || "Pending",
              payment: order.payment || false,
              paymentMethod: order.paymentMethod || "N/A",
              date: order.date || Date.now(),
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      } else {
        setOrderData([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrderData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const statusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-400";
      case "Packing":
        return "bg-yellow-400";
      case "Shipped":
        return "bg-purple-500";
      case "Out Of Delivery":
        return "bg-orange-500";
      case "Delivered":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  if (!token) return <Login />;

  return (
    <div className="border-t pt-16 px-4 md:px-8 space-y-6">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orderData.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm md:text-base">
              <img
                className="w-16 sm:w-20"
                src={item.image?.[0] || "https://via.placeholder.com/150"}
                alt={item.name || "Product"}
              />
              <div>
                <p className="font-medium">{item.name || "Product Name"}</p>
                <div className="flex items-center gap-3 mt-2 text-lg">
                  <p>
                    {currency}
                    {item.price || 0}
                  </p>
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Size: {item.size || "M"}</p>
                </div>
                <p className="mt-2 text-gray-400">
                  Date: {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Payment: {item.payment ? "Paid" : "Pending"} | Method: {item.paymentMethod}
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-between items-center mt-2 md:mt-0">
              <div className="flex items-center gap-2">
                <span
                  className={`block w-3 h-3 rounded-full ${statusColor(item.status)}`}
                />
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              {/* Optional Track button */}
              {/* <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track order</button> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
