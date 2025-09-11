import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3004/api/ecommerce_clone/orders/my_orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const { data } = await axios.put(
        `http://localhost:3004/api/ecommerce_clone/orders/${orderId}/cancel`,
        { reason: "Changed my mind" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(data.message);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, ...data.order } : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  if (loading) return <p className="p-6">Loading your orders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found. <span
          onClick={() => navigate("/")}
          className="text-blue-500 cursor-pointer"
        >
          Shop now
        </span></p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-md p-4 mb-6 bg-white"
          >
          
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold">
                  Order ID: <span className="text-gray-600">{order._id}</span>
                </h3>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  order.isCancelled
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {order.isCancelled ? "Cancelled" : "Active"}
              </span>
            </div>

            
            <div className="divide-y">
              {order.orderItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center py-3 space-x-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.qty} × ₹{item.price}
                    </p>
                    <p className="font-semibold text-gray-700">
                      ₹{item.qty * item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

           
            <div className="flex justify-between items-center mt-4">
              <h4 className="font-bold">Total: ₹{order.totalPrice}</h4>
              {!order.isCancelled && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersPage;
