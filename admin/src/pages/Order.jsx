import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import parcelIcon from '../assets/parcel_icon.svg';

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/allorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success('Order status updated successfully!');
        fetchAllOrders(); // Refresh orders
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  if (!token) return <p className="text-red-500">Please login to view orders.</p>;
  if (loading) return <p className="text-gray-500">Loading orders...</p>;

  return (
    <div className="p-4 space-y-6">
      {orders.map((order, orderIndex) => (
        <div
          key={order._id || orderIndex}
          className="border rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 bg-white"
        >
          <img src={parcelIcon} alt="parcel" className="w-16 h-16" />

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap gap-2">
              {order.items?.map((item, itemIndex) => (
                <span key={itemIndex} className="text-gray-700">
                  {item.name} x {item.quantity}{' '}
                  <span className="font-semibold">{item.size}</span>
                  {itemIndex !== order.items.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>

            <p className="font-medium">
              {order.address?.firstName} {order.address?.lastName}
            </p>

            <div className="text-gray-600">
              <p>{order.address?.street}</p>
              <p>
                {order.address?.city}, {order.address?.state}, {order.address?.country} -{' '}
                {order.address?.zipcode}
              </p>
            </div>

            <p className="text-gray-600">Phone: {order.address?.phone}</p>

            <div className="flex flex-wrap gap-4 text-gray-700">
              <p>Items: {order.items?.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
            </div>

            <p className="font-bold text-lg">
              {currency}
              {order.amount}
            </p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="border border-gray-300 rounded p-1 mt-2"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out Of Delivery">Out Of Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
