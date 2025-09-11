import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import returning from '../assets/returning.png'
import Responsive from './ProdutcsDetailscarousel';
import { CiLocationOn } from "react-icons/ci";
import CarouselForProductsList from '../components/CarouselForProductsDetails';
import { CartContext } from '../context/CartContext';


// StarRating Component
function StarRating({ rating, numReviews }) {
    const stars = Array.from({ length: 5 }, (_, i) => {
        const value = i + 1;
        return (
            <span key={value} className="relative text-lg">
                <span className="text-gray-300">★</span>
                {rating >= value ? (
                    // Full star
                    <span
                        className="absolute inset-0 text-yellow-500"
                        style={{
                            clipPath: 'inset(0 0 0 0)',
                        }}
                    >
                        ★
                    </span>
                ) : rating > value - 1 ? (
                    // Half star
                    <span
                        className="absolute inset-0 text-yellow-500"
                        style={{
                            clipPath: `inset(0 ${1 - (rating % 1 || 1)} 0 0)`,
                        }}
                    >
                        ★
                    </span>
                ) : null}
            </span>
        );
    });

    return (
        <div className="flex items-center space-x-1">
            {rating} {stars}
            <span className="text-sm  ml-2 text-blue-400 hover:border-b-[1px] hover:text-gray-600">
                {numReviews} rating
            </span>
        </div>
    );
}

function ProductsDetails() {
    const [product, setProduct] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
    const [imgSetting, setImgSetting] = useState(null);
    const [address, setAddress] = useState({ city: "Vijaywada", postalCode: "533124" });
    const [realtedItems, setRelatedItems] = useState([]);
    const { addToCart, isInCart } = useContext(CartContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();


    const imageRef = useRef(null);
    const zoomPreviewRef = useRef(null);

    const { id } = useParams();

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;

        const img = imageRef.current;
        const rect = img.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const lensSize = 100; // Size of the magnifier lens
        const maxX = rect.width - lensSize;
        const maxY = rect.height - lensSize;

        const boundedX = Math.min(Math.max(0, mouseX - lensSize / 2), maxX);
        const boundedY = Math.min(Math.max(0, mouseY - lensSize / 2), maxY);

        setLensPosition({ x: boundedX, y: boundedY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:3004/api/ecommerce_clone/products/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProduct(response.data);
                setImgSetting(response.data?.images?.[0]);
            } catch (error) {
                console.error('Failed to load product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const token = localStorage.getItem('token');
                const storedUser = JSON.parse(localStorage.getItem('user'));
                const userId = storedUser?.id;
                if (!userId) {
                    console.error('No user ID found in localStorage');
                    return;
                }
                const response = await axios.get(
                    `http://localhost:3004/api/ecommerce_clone/${userId}/address`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setAddress(response.data[0]);
                }

            } catch (error) {
                console.error('Failed to fetch address:', error);
            }
        };
        fetchAddress();
    }, []);


    useEffect(() => {
        if (!product?.category) return;
        const fetchRelatedItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:3004/api/ecommerce_clone/products/products_list/category/${product.category}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const filtered = Array.isArray(res.data) ? res.data.filter(fil => fil._id !== product._id) : [];
                const imageitems = filtered.map((each) => ({
                    url: each.images[0],
                    id: each._id,
                    name: each.name,
                    price: each.price,
                    rating: each.rating,
                    reviews: each.numReviews
                }));
                setRelatedItems(imageitems)
                console.log(realtedItems);
            } catch (error) {
                console.log('Error while fetching Related Items:', error)
            }
        };
        fetchRelatedItems();
    }, [product]);

    const handleBuyNow = async () => {
        navigate('/checkOut', { state: { product } });
    }

    if (!product) return <p className="p-8 text-xl">Loading product...</p>;

    return (
        <>

            <div className="flex flex-col lg:flex-row p-6 space-x-0 lg:space-x-8 items-start">
                {/* Thumbnail Gallery */}
                <div className="flex flex-row lg:flex-col space-y-0 lg:space-y-3 space-x-3 lg:space-x-0 w-full lg:w-fit overflow-x-auto lg:overflow-visible">
                    {product.images.map((imgSrc, index) => (
                        <div
                            key={index}
                            className="relative w-14 h-18 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors cursor-pointer flex-shrink-0"
                        >
                            <img
                                src={imgSrc}
                                alt={`thumbnail ${index}`}
                                className="w-full h-full object-cover p-1"
                                onClick={() => setImgSetting(imgSrc)}
                            />
                        </div>
                    ))}
                </div>

                {/* Main Image with Zoom Preview */}
                <div className="relative inline-block mt-4 lg:mt-0">
                    {/* Main Image */}
                    <div
                        className="relative w-full sm:w-[350px] md:w-[400px] h-[350px] sm:h-[450px] md:h-[500px] rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-300 cursor-pointer"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            ref={imageRef}
                            src={imgSetting}
                            alt="Main Product"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Zoom Preview (desktop only) */}
                    {isHovering && (
                        <div
                            ref={zoomPreviewRef}
                            className="hidden lg:block absolute top-0 left-[420px] w-[600px] h-[500px] bg-white rounded-lg shadow-lg overflow-hidden z-10 border-2 border-gray-200 transition-opacity duration-300"
                        >
                            <img
                                src={imgSetting}
                                alt="Zoom Preview"
                                className="w-full h-full object-cover"
                                style={{
                                    transform: `translate(-${lensPosition.x}px, -${lensPosition.y}px) scale(2)`,
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex bg-white flex-col p-2 pt-10 space-y-2 w-full lg:w-150 mt-6 lg:mt-0">
                    <h1 className="text-black text-2xl font-medium">{product.name}</h1>

                    {product && (
                        <>
                            <div className="flex items-center space-x-2">
                                <StarRating rating={product.rating} numReviews={product.numReviews} />
                            </div>
                            <hr className="text-gray-600 border-b-0 mt-5 " />
                            <h2 className="text-black text-xl font-semibold">{product.description}</h2>
                            <h2 className="text-black font-medium text-4xl">
                                <span className="text-black text-sm">₹</span>
                                {product.price}
                            </h2>
                            <Responsive />
                            <hr className="text-gray-600 border-b-0 mt-3 mb-2 " />
                            <h3 className="text-black font-bold text-2xl p-2">About this item </h3>
                            <p className="text-black w-fit text-l">{product.summary}</p>
                        </>
                    )}
                </div>

                {/* Sidebar */}
                <div className="border-[1px] col-1 shadow-2xl rounded-2xl border-gray-600 w-full sm:w-fit p-8 h-auto flex flex-col mt-6 lg:mt-0">
                    <div className="flex items-center gap-2 mb-3">
                        <CiLocationOn className="text-sm" />
                        <span className="text-blue-500 hover:cursor-pointer">
                            Delivery to {user ? address.city : "Vijaywada"}, {user ? address.postalCode : "533124"}
                        </span>
                    </div>

                    {product.inStock ? (
                        <p className="text-green-500 text-l mb-3">In Stock</p>
                    ) : (
                        <p className="text-red-500 text-l mb-3">Not available</p>
                    )}

                    <div className="flex items-center mb-3 flex-col">
                        <button
                            className="bg-yellow-300 hover:bg-yellow-400 text-black text-[14px] rounded-4xl p-2 h-auto w-50 hover:cursor-pointer mb-3"
                            onClick={() =>
                                isInCart(product._id) ? navigate("/cart") : addToCart(product)
                            }
                        >
                            {isInCart(product._id) ? "Go To Cart" : "Add To Cart"}
                        </button>
                        <button className="bg-[#ffa41c] hover:bg-[#fa8900] text-black font-semibold text-[14px] rounded-4xl p-2 w-52 hover:cursor-pointer mb-3" onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Items */}
            <div className="mt-24 mb-30 space-y-10 px-4">
                <h1 className="text-black font-bold text-3xl mt-10">Related Items</h1>
                <CarouselForProductsList items={realtedItems || []} />
            </div>

        </>
    );
}

export default ProductsDetails;