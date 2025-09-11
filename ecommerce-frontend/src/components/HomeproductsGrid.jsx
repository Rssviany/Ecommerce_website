import react from 'react'
import ProductGridCard from './ProductsGrid';


const HomeProductGrid = () => {
  const data = [
    {
      title: "Revamp your home in style",
      link: "#",
      products: [
        { image: "https://tse1.mm.bing.net/th/id/OIP.XWol-defKH6ZTvwTTL5QIgHaIJ?pid=Api&P=0&h=180", label: "Cushion covers" },
        { image: "https://tse3.mm.bing.net/th/id/OIP.VjhNajfJtLy01xp-p27DggHaF2?pid=Api&P=0&h=180", label: "Figurines" },
        { image: "https://tse1.mm.bing.net/th/id/OIP.AzouxZn3m740Rd3OrXDrpgHaFj?pid=Api&P=0&h=180", label: "Home storage" },
        { image: "https://tse4.mm.bing.net/th/id/OIP._lpBCk0mcAT3Yje_cVwjxgHaE4?pid=Api&P=0&h=180", label: "Lighting solutions" },
      ],
    },
    {
      title: "Appliances for your home | Up to 55% off",
      link: "#",
      products: [
        { image: "https://link.jpg", label: "Air conditioners" },
        { image: "https://link.jpg", label: "Refrigerators" },
        { image: "https://link.jpg", label: "Microwaves" },
        { image: "https://link.jpg", label: "Washing machines" },
      ],
    },
    {
      title: "Appliances for your home | Up to 55% off",
      link: "#",
      products: [
        { image: "https://link.jpg", label: "Air conditioners" },
        { image: "https://link.jpg", label: "Refrigerators" },
        { image: "https://link.jpg", label: "Microwaves" },
        { image: "https://link.jpg", label: "Washing machines" },
      ],
    },
    {
      title: "Appliances for your home | Up to 55% off",
      link: "#",
      products: [
        { image: "https://link.jpg", label: "Air conditioners" },
        { image: "https://link.jpg", label: "Refrigerators" },
        { image: "https://link.jpg", label: "Microwaves" },
        { image: "https://link.jpg", label: "Washing machines" },
      ],
    },
    
    // Add more...
  ];

  return (
    <div className="px-4 py-8 bg-[#f2f2f2]  ">
      <div className="flex flex-wrap gap-4 justify-between">
        {data.map((section, i) => (
          <ProductGridCard key={i} {...section} />
        ))}
      </div>
    </div>
  );
};

export default HomeProductGrid;
