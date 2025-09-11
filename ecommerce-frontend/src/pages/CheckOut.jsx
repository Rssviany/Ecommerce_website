import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutPage() {
  const {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const token = localStorage.getItem("token");

  
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3004/api/ecommerce_clone/address",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [token]);

  
  const handleSaveAddress = async () => {
    try {
      if (editingAddressId) {
        const { data } = await axios.put(
          `http://localhost:3004/api/ecommerce_clone/address/${editingAddressId}`,
          newAddress,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddresses(
          addresses.map((addr) =>
            addr._id === editingAddressId ? data : addr
          )
        );
        setEditingAddressId(null);
      } else {
        const { data } = await axios.post(
          "http://localhost:3004/api/ecommerce_clone/address",
          newAddress,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAddresses([...addresses, data]);
      }

      setNewAddress({
        fullName: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        isDefault: false,
      });
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  
  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3004/api/ecommerce_clone/address/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses(addresses.filter((addr) => addr._id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  
  const handleEditAddress = (addr) => {
    setNewAddress(addr);
    setEditingAddressId(addr._id);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  
  const handlePlaceOrder = async () => {
  if (!selectedAddress) {
    alert("Please select an address before placing order.");
    return;
  }

  try {
    await axios.post(
      "http://localhost:3004/api/ecommerce_clone/orders/orders_list",
      {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.quantity,   
          image: item.images[0],
          price: item.price,
          product: item._id,
        })),
        shippingAddress: {
          address: selectedAddress.streetAddress,
          city: selectedAddress.city,
          postalCode: selectedAddress.postalCode,
          country: selectedAddress.country,
        },
        paymentMethod: "Cash on Delivery",
        totalPrice: cartTotal,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Order placed successfully");
    navigate("/orders");
  } catch (error) {
    console.error("Error placing order:", error.response?.data || error);
    alert(error.response?.data?.message || "Failed to place order");
  }
};


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Your Items</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center border h-auto p-4 rounded-lg justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} x {item.quantity}
                      </p>
                      <p className="font-semibold text-yellow-600">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  
                  <div className="flex">
                  <div className="flex items-center  space-x-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm ml-4"
                  >
                    Remove
                  </button>
                </div>
                </div>
              ))}
            </div>
          )}
        </div>

      
        <div>
         
          <h3 className="text-lg font-semibold mb-4">Select Address</h3>
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className={`p-4 rounded-lg border-2 ${
                  selectedAddress?._id === addr._id
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start">
                  <label className="flex items-start cursor-pointer w-full">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress?._id === addr._id}
                      onChange={() => setSelectedAddress(addr)}
                      className="mt-1"
                    />
                    <span className="ml-2 text-sm">
                      <span className="font-semibold">{addr.fullName}</span>,{" "}
                      {addr.streetAddress}, {addr.city}, {addr.state},{" "}
                      {addr.postalCode}, {addr.country} 📍
                      <br />
                      Phone: {addr.phoneNumber}
                    </span>
                  </label>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEditAddress(addr)}
                    className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(addr._id)}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          <h3 className="text-lg font-semibold mt-6 mb-2">
            {editingAddressId ? "Edit Address" : "Add New Address"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newAddress.fullName}
              onChange={(e) =>
                setNewAddress({ ...newAddress, fullName: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newAddress.phoneNumber}
              onChange={(e) =>
                setNewAddress({ ...newAddress, phoneNumber: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Street Address"
              value={newAddress.streetAddress}
              onChange={(e) =>
                setNewAddress({
                  ...newAddress,
                  streetAddress: e.target.value,
                })
              }
              className="border p-2 rounded col-span-2"
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={newAddress.postalCode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, postalCode: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Country"
              value={newAddress.country}
              onChange={(e) =>
                setNewAddress({ ...newAddress, country: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleSaveAddress}
            className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600"
          >
            {editingAddressId ? "Update Address" : "Save Address"}
          </button>

          {/* Total + Place Order */}
          <div className="mt-6 flex justify-between items-center">
            <h2 className="px-6 py-2 bg-green-500 text-white rounded-lg">
              Total: ₹{Math.ceil(cartTotal)}
            </h2>
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;


