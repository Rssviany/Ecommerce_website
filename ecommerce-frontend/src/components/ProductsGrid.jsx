import react from 'react'


const ProductGridCard = ({ title, products, link }) => {
  return (
    <div className="bg-white p-4 shadow rounded-md w-full sm:w-[48%] md:w-[23%]">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {products.map((item, i) => (
          <div key={i} className="flex flex-col items-start">
            <img src={item.image} alt={item.label} className="w-full h-30 object-cover rounded" />
            <span className="text-sm mt-1">{item.label}</span>
          </div>
        ))}
      </div>
      <a href={link} className="text-blue-500 text-sm hover:underline">
        {link.includes("See") ? "See all deals" : "Explore all"}
      </a>
    </div>
  );
};

export default ProductGridCard;

