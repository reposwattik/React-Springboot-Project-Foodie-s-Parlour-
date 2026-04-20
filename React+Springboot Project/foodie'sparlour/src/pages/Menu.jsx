import { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

const Menu = () => {
  const [products] = useState([
    { 
      id: 1, 
      name: "Pizza", 
      category: "pizza", 
      price: 249, 
      image: "/assets/images/pizza-main.jpg" 
    },
    { 
      id: 2, 
      name: "Burger", 
      category: "burger", 
      price: 179, 
      image: "/assets/images/burger-main.jpg" 
    },
    { 
      id: 3, 
      name: "Sandwich", 
      category: "sandwich", 
      price: 149, 
      image: "/assets/images/sandwich-main.jpg" 
    },
    { 
      id: 4, 
      name: "Tacos", 
      category: "tacos", 
      price: 199, 
      image: "/assets/images/tacos-main.jpg" 
    },
    { 
      id: 5, 
      name: "Ice Cream", 
      category: "icecream", 
      price: 99, 
      image: "/assets/images/icecream-main.jpg" 
    },
    { 
      id: 6, 
      name: "Fries & Drink Box", 
      category: "friesbox", 
      price: 229, 
      image: "/assets/images/friesbox-main.jpg" 
    },
  ]);

  return (
    <div>
      <h2 className="text-center mb-5 display-5 fw-bold">Our Delicious Menu</h2>
      
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map(product => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;