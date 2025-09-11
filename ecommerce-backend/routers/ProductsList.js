import express from 'express';
import Products from '../models/ProductsModel.js';
import verifyToken from '../middlewares/auth.js';

const productRouters = express.Router();

productRouters.post('/add', verifyToken, async (req, res) => {
    try {
        const { name, brand, category, price, description, images, inStock, rating, numReviews } = req.body;
        const newProduct = await Products({
            name, brand, category, price, description, images, inStock, rating, numReviews
        });
        await newProduct.save();
        res.status(200).json({ message: 'Product is added successfully' });
    } catch (error) {
        res.status(404).json({ message: 'Error while adding Product' });
        console.log("Error Adding while adding Product:", error);
    }
});
productRouters.post('/bulk_add', verifyToken, async (req, res) => {
    try {
        const productsList = req.body;
        const result = await Products.insertMany(productsList);
        res.status(201).json({ message: 'Bulk-Products is added successfully' });
    } catch (error) {
        res.status(404).json({ message: 'Error while adding Bulk data' });
        console.log("Error Adding while adding Bulk data products:", error);
    }
});
productRouters.get('/products_list', verifyToken, async (req, res) => {
    try {
        const products = await Products.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get products' });
        console.log("Error while Getting List of Products", error);
    }
});

productRouters.get('/products_list/category/:categoryName', verifyToken, async (req, res) => {
    try {
        const result = await Products.find({ category: req.params.categoryName});
        if (!result.length) return res.status(404).json({ message: 'No Products is founded' });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products by category' });
        console.log("Error fetching products by category:", err);
    }
});
productRouters.get('/categories',async (req,res)=>{
    try {
        const categories=await Products.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories' });
        console.error("Error fetching products by category:", error.message);
    }
});
productRouters.get('/:id', verifyToken, async (req, res) => {
    try {
        const result = await Products.findById(req.params.id);
        if (!result) return res.status(404).json({ message: 'Product is not found' });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Product' });
        console.log("Failed to fetch Product", error);
    }
});


export default productRouters;