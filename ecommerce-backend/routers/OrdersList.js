import express from 'express';
import verifyToken from '../middlewares/auth.js';
import Order from '../models/OrdersModel.js';
const orderRouter = express.Router();

orderRouter.post('/orders_list', verifyToken, async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }
    try {
        const order = new Order({
            user: req.user.userId,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        });
        await order.save();
        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
        console.log("Error while creating a new Order:", error);
    }
});
orderRouter.get('/my_orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
        .populate("orderItems.product")
        .sort({createdAt:-1});
        res.json(orders);
    } catch (error) {
        console.log("Unable to fetch Ordres:", error);
        res.status(500).json({ message: 'Failed to create order', error });
    }
});
orderRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});


orderRouter.put("/:id/cancel", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);


    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to cancel this order" });
    }
    if (order.isCancelled) {
      return res.status(400).json({ message: "Order already cancelled" });
    }
    order.isCancelled = true;
    order.cancelledAt = Date.now();
    order.cancelReason = req.body.reason || "User cancelled the order";

    await order.save();

    res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
});


export default orderRouter;