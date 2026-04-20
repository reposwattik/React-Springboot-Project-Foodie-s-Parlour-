import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import ingredientsConfig from '../config/ingredients.js';

const CustomizeSandwich = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [customName, setCustomName] = useState('');
  const [type, setType] = useState('chicken');
  const [ingredient, setIngredient] = useState('');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  // Type options with icons and prices (for dropdown only)
  const typeOptions = {
    'chicken': { label: 'Chicken', price: 60, icon: '/assets/icons/chicken.png' },
    'egg': { label: 'Egg', price: 40, icon: '/assets/icons/egg.png' },
    'paneer': { label: 'Paneer', price: 50, icon: '/assets/icons/paneer.png' },
    'potato': { label: 'Potato', price: 40, icon: '/assets/icons/potato.png' },
  };

  // Additional Ingredients - NO main types
  const additionalIngredients = {
    'Lettuce': { icon: '/assets/icons/lettuce.png', price: 20 },
    'Onion': { icon: '/assets/icons/onion.png', price: 15 },
    'Cheese Slice': { icon: '/assets/icons/cheese.png', price: 25 },
    'Ham Sauce': { icon: '/assets/icons/sauce.png', price: 20 },
    'Mayonnaise': { icon: '/assets/icons/mayo.png', price: 20 },
  };

  const finalPrice = 149 + (ingredient ? additionalIngredients[ingredient]?.price || 0 : 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectType = (key) => {
    setType(key);
    setShowTypeDropdown(false);
  };

  const handleAddToCart = async () => {
    const customItem = {
      itemName: customName.trim() || ``,
      category: 'sandwich',
      price: finalPrice,
      customDescription: `${typeOptions[type].label} sandwich with ${ingredient || 'no extra'}`,
      quantity: 1,
      image: "/assets/images/sandwich-main.jpg"
    };

    addToCart(customItem);

    

    alert('Sandwich added to cart!');
    navigate('/cart');
  };

  return (
    <div className="container">
      <Breadcrumbs productName={`Sandwich`} />

      <div className="row align-items-center mb-5">
        {/* Left: Title */}
        <div className="col-lg-8">
          <h2 className="mb-4">Customize Your Sandwich</h2>
        </div>

        {/* Right: Main Product Image */}
        <div className="col-lg-4 text-end">
          <img 
            src="/assets/images/sandwich-main.jpg" 
            alt="Sandwich" 
            className="img-fluid rounded shadow"
            style={{ 
              maxHeight: '180px', 
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </div>
      </div>

      {/* Type Dropdown with Icon + Price */}
      <div className="mb-4">
        <h5>Sandwich Type</h5>
        <div className="position-relative">
          <button 
            className="form-select text-start d-flex align-items-center gap-2"
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
          >
            <img 
              src={typeOptions[type].icon} 
              alt={type} 
              style={{ width: '28px', height: '28px' }} 
            />
            {typeOptions[type].label} (+₹{typeOptions[type].price})
          </button>

          {showTypeDropdown && (
            <div className="position-absolute w-100 bg-white border shadow mt-1 rounded" style={{ zIndex: 1000 }}>
              {Object.keys(typeOptions).map(key => {
                const t = typeOptions[key];
                return (
                  <button
                    key={key}
                    className="d-flex align-items-center gap-2 w-100 text-start p-3 border-bottom"
                    onClick={() => selectType(key)}
                  >
                    <img src={t.icon} alt={key} style={{ width: '28px', height: '28px' }} />
                    {t.label} (+₹{t.price})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Additional Ingredients */}
      <div className="mb-4">
        <h5>Additional Ingredients (Max 1)</h5>
        <div className="d-flex flex-wrap gap-2">
          {Object.keys(additionalIngredients).map(ing => {
            const data = additionalIngredients[ing];
            return (
              <button 
                key={ing}
                onClick={() => setIngredient(ing)}
                className={`btn d-flex align-items-center gap-2 ${ingredient === ing ? 'btn-success' : 'btn-outline-secondary'}`}
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
          placeholder="e.g. Classic Club"
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

export default CustomizeSandwich;