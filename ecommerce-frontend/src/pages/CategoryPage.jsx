import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";


function CategoryPage() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const handleProducts=async()=>{
            try {
                const token=localStorage.getItem('token');
                if(!token) return console.log('No Token Founded');
                const response=await axios.get(`http://localhost:3004/api/ecommerce_clone/products/products_list/category/${categoryName}`,{
                    headers:{Authorization: `Bearer ${token}`}
                });
                setProducts(response.data.products || response.data);
            } catch (error) {
                console.log('Error while fetching Products:',error);
            }
        }
        handleProducts();
    },[categoryName]);

    return (
        <>
            <div className="p-5">
                <h1 className="text-2xl font-semibold mb-5">Showing all {categoryName} Products </h1>

                {products.length === 0 ?
                    (
                        <p className="p-10 text-3xl text-black">No Products Found in this Category</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            {products.map((each) => (
                                <div key={each._id} className="border rounded-lg p-3 shadow hover:shadow-lg transition" onClick={()=>navigate(`/products/${each._id}`)} >
                                    <img src={each.images[0]} alt={each.name} className="w-full h-40 object-contain mb-3" />
                                    <h2 className="font-medium">{each.name}</h2>
                                    <p className="text-gray-600 text-sm">{each.brand}</p>
                                    <p className="font-bold mt-1">₹{each.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
            </div>

        </>
    )
}

export default CategoryPage
