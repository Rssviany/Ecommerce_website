import axios from 'axios';
import Responsive from './CarouselMultipleItems';
import { useState } from 'react';
import { useEffect } from 'react';

function CategoryCarousel({ category }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token);
                const response = await axios.get(`http://localhost:3004/api/ecommerce_clone/products/products_list/category/${category}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                const imageItems = response.data.map((img) => ({
                    url: img.images[0],
                    id: img._id,
                }));
                setItems(imageItems.slice(0,10));
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        }
        fetchCategoryProducts();
    }, [category]);
    return (
        <>
            <div className="py-6 ">  
                <Responsive items={items} />
            </div>
        </>
    )
}

export default CategoryCarousel;
