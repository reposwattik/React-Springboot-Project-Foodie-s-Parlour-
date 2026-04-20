import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import ingredientsConfig from '../config/ingredients.js';

const CustomizeIcecream = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [customName, setCustomName] = useState('');
  const [coneSize, setConeSize] = useState('small');
  const [flavors, setFlavors] = useState(['vanilla']);
  const [coating, setCoating] = useState('');

  const icecreamFlavors = ingredientsConfig.icecream;

  const conePrice = coneSize === 'big' ? 40 : 0;
  const flavorPrice = flavors.reduce((sum, f) => sum + (icecreamFlavors[f]?.price || 0), 0);
  const finalPrice = 99 + conePrice + flavorPrice;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleAddToCart = async () => {
    const customItem = {
      itemName: customName.trim() || ``,
      category: 'icecream',
      price: finalPrice,
      customDescription: `${coneSize} cone - ${flavors.join(' + ')} ${coating ? 'with ' + coating : ''}`,
      quantity: 1,
      image: "/assets/images/icecream-main.jpg"
    };

    addToCart(customItem);

    
    alert('Ice Cream added to cart!');
    navigate('/cart');
  };

  return (
    <div className="container">
      <Breadcrumbs productName={`Ice Cream`} />

      <div className="row align-items-center mb-5">
        {/* Left: Title */}
        <div className="col-lg-8">
          <h2 className="mb-4">Customize Your Ice Cream</h2>
        </div>

        {/* Right: Main Product Image */}
        <div className="col-lg-4 text-end">
          <img 
            src="/assets/images/icecream-main.jpg" 
            alt="IceCream" 
            className="img-fluid rounded shadow"
            style={{ 
              maxHeight: '180px', 
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <h5>Cone Size</h5>
        <button onClick={() => setConeSize('small')} className={`btn me-2 ${coneSize === 'small' ? 'btn-primary' : 'btn-outline-primary'}`}>Small</button>
        <button onClick={() => setConeSize('big')} className={`btn ${coneSize === 'big' ? 'btn-primary' : 'btn-outline-primary'}`}>Big (+₹40)</button>
      </div>

      <div className="mb-4">
        <h5>Flavors</h5>
        <div className="d-flex flex-wrap gap-2">
          {Object.keys(icecreamFlavors).map(f => {
            const data = icecreamFlavors[f];
            return (
              <button 
                key={f}
                onClick={() => setFlavors(flavors.includes(f) ? [f] : [flavors[0], f])}
                className={`btn d-flex align-items-center gap-2 ${flavors.includes(f) ? 'btn-success' : 'btn-outline-secondary'}`}
              >
                <img src={data.icon} alt={f} style={{ width: '28px', height: '28px' }} />
                {f} <span className="text-muted">(₹{data.price})</span>
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
          placeholder="e.g. Double Chocolate Dream"
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

export default CustomizeIcecream;