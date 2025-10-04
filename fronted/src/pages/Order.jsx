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
        {}, // empty body, userId comes from middleware
        { headers: { token } }
      );

      console.log("Backend response:", response.data);

      if (response.data.success && response.data.orders.length > 0) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          if (order.items && order.items.length > 0) {
            order.items.forEach((item) => {
              item.status = order.status || "Pending";
              item.payment = order.payment || false;
              item.paymentMethod = order.paymentMethod || "N/A";
              item.date = order.date || Date.now();
              allOrdersItem.push(item);
            });
          }
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

  if (!token) return <Login />;

  return (
    <div className="border-t pt-16">
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
                <p className="mt-2">
                  Date:{" "}
                  <span className="text-gray-400">
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Payment: {item.payment ? "Paid" : "Pending"} | Method:{" "}
                  {item.paymentMethod}
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`block w-2 h-2 rounded-full ${
                    item.status === "Ready To Ship"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              {/* <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                Track order
              </button> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
