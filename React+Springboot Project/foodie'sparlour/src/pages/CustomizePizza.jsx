import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import ingredientsConfig from '../config/ingredients.js';

const CustomizePizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [customName, setCustomName] = useState('');
  const [size, setSize] = useState('9');
  const [toppings, setToppings] = useState([]);

  const pizzaIngredients = ingredientsConfig.pizza;

  const sizePrices = { '7': 0, '9': 50, '12': 120 };

  const toggleTopping = (topping) => {
    if (toppings.includes(topping)) {
      setToppings(toppings.filter(t => t !== topping));
    } else {
      setToppings([...toppings, topping]);
    }
  };

  const finalPrice = 249 + sizePrices[size] + 
    toppings.reduce((sum, t) => sum + (pizzaIngredients[t]?.price || 0), 0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = async () => {
    const customItem = {
      itemName: customName.trim() || ``,
      category: 'pizza',
      price: finalPrice,
      customDescription: `${size}" Pizza | Toppings: ${toppings.length ? toppings.join(', ') : 'None'}`,
      quantity: 1,
      image: "/assets/images/pizza-main.jpg"   // Added for cart thumbnail
    };

    addToCart(customItem);

    

    alert('Pizza added to cart!');
    navigate('/cart');
  };

  return (
    <div className="container">
      <Breadcrumbs productName={`Pizza `} />

      <div className="row align-items-center mb-5">
        {/* Left: Title */}
        <div className="col-lg-8">
          <h2 className="mb-4">Customize Your Pizza</h2>
        </div>

        {/* Right: Main Product Image */}
        <div className="col-lg-4 text-end">
          <img 
            src="/assets/images/pizza-main.jpg" 
            alt="Pizza" 
            className="img-fluid rounded shadow"
            style={{ 
              maxHeight: '180px', 
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-4">
        <h5>Select Size</h5>
        <div className="btn-group">
          <button onClick={() => setSize('7')} className={`btn ${size === '7' ? 'btn-primary' : 'btn-outline-primary'}`}>7 inch</button>
          <button onClick={() => setSize('9')} className={`btn ${size === '9' ? 'btn-primary' : 'btn-outline-primary'}`}>9 inch</button>
          <button onClick={() => setSize('12')} className={`btn ${size === '12' ? 'btn-primary' : 'btn-outline-primary'}`}>12 inch</button>
        </div>
      </div>

      {/* Toppings with Icon + Price */}
      <div className="mb-4">
        <h5>Choose Toppings</h5>
        <div className="row g-3">
          {Object.keys(pizzaIngredients).map(topping => {
            const data = pizzaIngredients[topping];
            return (
              <div className="col-md-4" key={topping}>
                <button 
                  onClick={() => toggleTopping(topping)}
                  className={`btn w-100 d-flex align-items-center gap-3 ${toppings.includes(topping) ? 'btn-success' : 'btn-outline-secondary'}`}
                >
                  <img 
                    src={data.icon} 
                    alt={topping} 
                    style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
                  />
                  <span>{topping}</span>
                  <span className="text-muted ms-auto">(₹{data.price})</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total Price */}
      <div className="alert alert-info fs-5 mb-4">
        Total Price: ₹{finalPrice}
      </div>

      {/* Custom Name Input */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Give this item a custom name (optional)</label>
        <input 
          type="text" 
          className="form-control" 
          placeholder="e.g. My Special Margherita"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
      </div>

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart} className="btn btn-success btn-lg">
        🛒 Add to Cart
      </button>
    </div>
  );
};

export default CustomizePizza;