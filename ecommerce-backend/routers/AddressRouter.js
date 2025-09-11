import express from "express";
import verifyToken from "../middlewares/auth.js";
import Register from "../models/RegistrationModel.js";


const addressRouter = express.Router();


addressRouter.get("/", verifyToken, async (req, res) => {
  try {
    const user = await Register.findById(req.user.userId).select("addresses");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
});

addressRouter.post("/", verifyToken, async (req, res) => {
  try {
    const { fullName, phoneNumber, streetAddress, city, state, postalCode, country, isDefault } = req.body;

    const user = await Register.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

   
    if (isDefault) {
      user.addresses.forEach(addr => (addr.isDefault = false));
    }

    user.addresses.push({ fullName, phoneNumber, streetAddress, city, state, postalCode, country, isDefault });
    await user.save();

    res.status(201).json(user.addresses);
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Failed to add address" });
  }
});

addressRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    const { fullName, phoneNumber, streetAddress, city, state, postalCode, country, isDefault } = req.body;

    const user = await Register.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });

    if (isDefault) {
      user.addresses.forEach(addr => (addr.isDefault = false));
    }

  
    address.fullName = fullName ?? address.fullName;
    address.phoneNumber = phoneNumber ?? address.phoneNumber;
    address.streetAddress = streetAddress ?? address.streetAddress;
    address.city = city ?? address.city;
    address.state = state ?? address.state;
    address.postalCode = postalCode ?? address.postalCode;
    address.country = country ?? address.country;
    address.isDefault = isDefault ?? address.isDefault;

    await user.save();
    res.json(user.addresses);
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Failed to update address" });
  }
});


addressRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    const user = await Register.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });

    address.deleteOne();
    await user.save();

    res.json(user.addresses);
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Failed to delete address" });
  }
});

export default addressRouter;
