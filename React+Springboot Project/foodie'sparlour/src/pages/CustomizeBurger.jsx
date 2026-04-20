import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import ingredientsConfig from '../config/ingredients.js';

const CustomizeBurger = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [customName, setCustomName] = useState('');
  const [size, setSize] = useState('small');
  const [patty, setPatty] = useState('chicken');
  const [extraPatty, setExtraPatty] = useState(false);
  const [middleBread, setMiddleBread] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [showPattyDropdown, setShowPattyDropdown] = useState(false);

  // Patty options with icons and prices (for dropdown only)
  const pattyOptions = {
    'chicken': { label: 'Chicken Patty', price: 60, icon: '/assets/icons/chicken.png' },
    'egg': { label: 'Egg Patty', price: 40, icon: '/assets/icons/egg.png' },
    'paneer': { label: 'Paneer Patty', price: 50, icon: '/assets/icons/paneer.png' },
    'potato': { label: 'Potato Patty', price: 40, icon: '/assets/icons/potato.png' },
  };

  // Additional Ingredients - NO PATTIES (only real toppings)
  const additionalIngredients = {
    'Lettuce': { icon: '/assets/icons/lettuce.png', price: 20 },
    'Onion': { icon: '/assets/icons/onion.png', price: 15 },
    'Cheese Slice': { icon: '/assets/icons/cheese.png', price: 25 },
    'Ham Sauce': { icon: '/assets/icons/sauce.png', price: 20 },
    'Mayonnaise': { icon: '/assets/icons/mayo.png', price: 20 },
  };

  const basePrice = size === 'large' ? 220 : 179;
  const finalPrice = basePrice + 
    (extraPatty ? 60 : 0) + 
    (middleBread ? 25 : 0) + 
    ingredients.reduce((sum, ing) => sum + (additionalIngredients[ing]?.price || 0), 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const toggleIngredient = (ing) => {
    if (ingredients.includes(ing)) {
      setIngredients(ingredients.filter(i => i !== ing));
    } else {
      setIngredients([...ingredients, ing]);
    }
  };

  const selectPatty = (key) => {
    setPatty(key);
    setShowPattyDropdown(false);
  };

  const handleAddToCart = async () => {
    const customItem = {
      itemName: customName.trim() || ``,
      category: 'burger',
      price: finalPrice,
      customDescription: `${size.toUpperCase()} ${pattyOptions[patty].label} ${extraPatty ? '+ Extra Patty' : ''} ${middleBread ? '+ Middle Bread' : ''} | ${ingredients.join(', ') || 'None'}`,
      quantity: 1,
      image: "/assets/images/burger-main.jpg"
    };

    addToCart(customItem);

    

    alert('Burger added to cart!');
    navigate('/cart');
  };

  return (
    <div className="container">
      <Breadcrumbs productName={`Burger`} />

      <div className="row align-items-center mb-5">
        {/* Left: Title */}
        <div className="col-lg-8">
          <h2 className="mb-4">Customize Your Burger</h2>
        </div>

        {/* Right: Main Product Image */}
        <div className="col-lg-4 text-end">
          <img 
            src="/assets/images/burger-main.jpg" 
            alt="Burger" 
            className="img-fluid rounded shadow"
            style={{ 
              maxHeight: '180px', 
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </div>
      </div>

      

      {/* Size */}
      <div className="mb-3">
        <h5>Size</h5>
        <button onClick={() => setSize('small')} className={`btn me-2 ${size === 'small' ? 'btn-primary' : 'btn-outline-primary'}`}>Small</button>
        <button onClick={() => setSize('large')} className={`btn ${size === 'large' ? 'btn-primary' : 'btn-outline-primary'}`}>Large</button>
      </div>

      {/* Custom Patty Dropdown with Icons + Price */}
      <div className="mb-4">
        <h5>Patty Type</h5>
        <div className="position-relative">
          <button 
            className="form-select text-start d-flex align-items-center gap-2"
            onClick={() => setShowPattyDropdown(!showPattyDropdown)}
          >
            <img 
              src={pattyOptions[patty].icon} 
              alt={patty} 
              style={{ width: '28px', height: '28px' }} 
            />
            {pattyOptions[patty].label} (+₹{pattyOptions[patty].price})
          </button>

          {showPattyDropdown && (
            <div className="position-absolute w-100 bg-white border shadow mt-1 rounded" style={{ zIndex: 1000 }}>
              {Object.keys(pattyOptions).map(key => {
                const p = pattyOptions[key];
                return (
                  <button
                    key={key}
                    className="d-flex align-items-center gap-2 w-100 text-start p-3 border-bottom"
                    style={{ background: 'white' }}
                    onClick={() => selectPatty(key)}
                  >
                    <img src={p.icon} alt={key} style={{ width: '28px', height: '28px' }} />
                    {p.label} (+₹{p.price})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Extra Patty & Middle Bread */}
      <div className="form-check mb-2">
        <input type="checkbox" className="form-check-input" checked={extraPatty} onChange={() => setExtraPatty(!extraPatty)} />
        <label className="form-check-label">Add Extra Patty (+₹60)</label>
      </div>

      {extraPatty && (
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" checked={middleBread} onChange={() => setMiddleBread(!middleBread)} />
          <label className="form-check-label">Add Middle Bread (+₹25)</label>
        </div>
      )}

      {/* Additional Ingredients - NO PATTIES */}
      <div className="mb-4">
        <h5>Additional Ingredients</h5>
        <div className="d-flex flex-wrap gap-2">
          {Object.keys(additionalIngredients).map(ing => {
            const data = additionalIngredients[ing];
            return (
              <button 
                key={ing}
                onClick={() => toggleIngredient(ing)}
                className={`btn d-flex align-items-center gap-2 ${ingredients.includes(ing) ? 'btn-success' : 'btn-outline-secondary'}`}
              >
                <img src={data.icon} alt={ing} style={{ width: '28px', height: '28px' }} />
                {ing} <span className="text-muted">(₹{data.price})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="alert alert-info fs-5 mb-4">
        Total: ₹{finalPrice}
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Give this item a custom name (optional)</label>
        <input 
          type="text" 
          className="form-control" 
          placeholder="e.g. Double Cheese Blast"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
      </div>

      <button onClick={handleAddToCart} className="btn btn-success btn-lg">
        🛒 Add to Cart
      </button>
    </div>
  );
};

export default CustomizeBurger;