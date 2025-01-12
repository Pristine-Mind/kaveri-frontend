import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from "../api/axiosInstance";

interface Product {
  name: string;
  description: string;
  price: string;
}

interface OrderItem {
  product_details: Product;
  quantity: number;
}

interface Shipping {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

interface OrderStats {
  total_orders: number;
  total_items: number;
  last_week_total_orders_percentage: number;
  last_week_total_items_percentage: number;
}

interface Order {
  id: number;
  shipping: Shipping;
  total_price: string;
  delivery_charge: string;
  order_status: string;
  created_at: string;
  items: OrderItem[];
}

interface OrdersPageProps {
  setHasError: (hasError: boolean) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ setHasError }) => {
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const response = await axiosInstance.get('/order-stats/');
        setOrderStats(response.data);
        console.log('Order Stats:', response.data);
      } catch (error) {
        console.error('Error fetching order stats:', error);
        toast.error('Failed to load order statistics.');
        setHasError(true);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/v1/orders/');
        setOrders(response.data.results);
        console.log('Orders:', response.data.results);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders.');
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderStats();
    fetchOrders();
  }, [setHasError]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading data...</p>
      </div>
    );
  }

  if (!orderStats || !orders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
        <h3 className="text-xl font-semibold">Total Orders</h3>
        <p className="text-2xl">{orderStats.total_orders}</p>
        <p className="text-sm text-gray-500">{orderStats.last_week_total_orders_percentage}% last week</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
        <h3 className="text-xl font-semibold">Order Items Over Time</h3>
        <p className="text-2xl">{orderStats.total_items}</p>
        <p className="text-sm text-gray-500">{orderStats.last_week_total_items_percentage}% last week</p>
      </div>
    </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Order List</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Shipping Info</th>
              <th className="py-2 px-4 text-left">Products</th>
              <th className="py-2 px-4 text-left">Total Price</th>
              <th className="py-2 px-4 text-left">Order Status</th>
              <th className="py-2 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">
                  <div>{order.shipping.first_name} {order.shipping.last_name}</div>
                  <div>{order.shipping.email}</div>
                  <div>{order.shipping.phone}</div>
                </td>
                <td className="py-2 px-4">
                  {order.cart.items.map((item, index) => (
                    <div key={index}>
                      <strong>{item.product_details.name}</strong> - {item.quantity} x ${item.product_details.price}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4">${order.total_price}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      order.order_status === 'Pending' ? 'bg-yellow-500 text-white' :
                      order.order_status === 'Shipped' ? 'bg-blue-500 text-white' :
                      'bg-green-500 text-white'
                    }`}
                  >
                    {order.order_status}
                  </span>
                </td>
                <td className="py-2 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
