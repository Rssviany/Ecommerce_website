import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  category: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    type: [String], 
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  summary:{
    type:String,
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Products = mongoose.model('Product', productSchema);

export default Products;

