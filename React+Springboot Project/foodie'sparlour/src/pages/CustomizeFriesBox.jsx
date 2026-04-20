import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import ingredientsConfig from '../config/ingredients.js';

const CustomizeFriesBox = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [customName, setCustomName] = useState('');
  const [fries, setFries] = useState('french fries');
  const [drink, setDrink] = useState('coca cola');
  const [showFriesDropdown, setShowFriesDropdown] = useState(false);
  const [showDrinkDropdown, setShowDrinkDropdown] = useState(false);

  // Fries options with icons and prices
  const friesOptions = {
    'french fries': { label: 'French Fries', price: 80, icon: '/assets/icons/fries.png' },
    'hashbrowns': { label: 'Hashbrowns', price: 90, icon: '/assets/icons/hashbrown.png' },
    'swirls': { label: 'Swirls', price: 100, icon: '/assets/icons/swirls.png' },
    'chicken nuggets': { label: 'Chicken Nuggets', price: 120, icon: '/assets/icons/nuggets.png' },
  };

  // Drink options with icons and prices
  const drinkOptions = {
    'coca cola': { label: 'Coca Cola', price: 40, icon: '/assets/icons/coke.png' },
    'sprite': { label: 'Sprite', price: 40, icon: '/assets/icons/sprite.png' },
    'fanta': { label: 'Fanta', price: 40, icon: '/assets/icons/fanta.png' },
  };

  const finalPrice = friesOptions[fries].price + drinkOptions[drink].price;

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  const selectFries = (key) => {
    setFries(key);
    setShowFriesDropdown(false);
  };

  const selectDrink = (key) => {
    setDrink(key);
    setShowDrinkDropdown(false);
  };

  const handleAddToCart = async () => {
    const customItem = {
      itemName: customName.trim() || ``,
      category: 'friesbox',
      price: finalPrice,
      customDescription: `${friesOptions[fries].label} + ${drinkOptions[drink].label}`,
      quantity: 1,
      image: "/assets/images/friesbox-main.jpg"
    };

    addToCart(customItem);

    

    alert('Fries & Drink Box added to cart!');
    navigate('/cart');
  };

  return (
    <div className="container">
      <Breadcrumbs productName={`Fries & Drink Box`} />

      <div className="row align-items-center mb-5">
        {/* Left: Title */}
        <div className="col-lg-8">
          <h2 className="mb-4">Customize Your Fries & Drink Box</h2>
        </div>

        {/* Right: Main Product Image */}
        <div className="col-lg-4 text-end">
          <img 
            src="/assets/images/friesbox-main.jpg" 
            alt="Fries & Drinks" 
            className="img-fluid rounded shadow"
            style={{ 
              maxHeight: '180px', 
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </div>
      </div>

      {/* Fries Selection - Custom Dropdown with Icon + Price */}
      <div className="mb-4">
        <h5>Select Fries</h5>
        <div className="position-relative">
          <button 
            className="form-select text-start d-flex align-items-center gap-2"
            onClick={() => setShowFriesDropdown(!showFriesDropdown)}
          >
            <img 
              src={friesOptions[fries].icon} 
              alt={fries} 
              style={{ width: '28px', height: '28px' }} 
            />
            {friesOptions[fries].label} (₹{friesOptions[fries].price})
          </button>

          {showFriesDropdown && (
            <div className="position-absolute w-100 bg-white border shadow mt-1 rounded" style={{ zIndex: 1000 }}>
              {Object.keys(friesOptions).map(key => {
                const f = friesOptions[key];
                return (
                  <button
                    key={key}
                    className="d-flex align-items-center gap-2 w-100 text-start p-3 border-bottom"
                    onClick={() => selectFries(key)}
                  >
                    <img src={f.icon} alt={key} style={{ width: '28px', height: '28px' }} />
                    {f.label} (₹{f.price})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Drink Selection - Custom Dropdown with Icon + Price */}
      <div className="mb-4">
        <h5>Select Drink</h5>
        <div className="position-relative">
          <button 
            className="form-select text-start d-flex align-items-center gap-2"
            onClick={() => setShowDrinkDropdown(!showDrinkDropdown)}
          >
            <img 
              src={drinkOptions[drink].icon} 
              alt={drink} 
              style={{ width: '28px', height: '28px' }} 
            />
            {drinkOptions[drink].label} (₹{drinkOptions[drink].price})
          </button>

          {showDrinkDropdown && (
            <div className="position-absolute w-100 bg-white border shadow mt-1 rounded" style={{ zIndex: 1000 }}>
              {Object.keys(drinkOptions).map(key => {
                const d = drinkOptions[key];
                return (
                  <button
                    key={key}
                    className="d-flex align-items-center gap-2 w-100 text-start p-3 border-bottom"
                    onClick={() => selectDrink(key)}
                  >
                    <img src={d.icon} alt={key} style={{ width: '28px', height: '28px' }} />
                    {d.label} (₹{d.price})
                  </button>
                );
              })}
            </div>
          )}
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
          placeholder="e.g. Classic Combo"
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

export default CustomizeFriesBox;