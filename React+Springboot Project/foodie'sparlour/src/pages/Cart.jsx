import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    discountAmount, 
    total, 
    promoCode, 
    applyPromoCode 
  } = useContext(CartContext);

  const [codeInput, setCodeInput] = useState('');

  const handleApplyPromo = () => {
    const success = applyPromoCode(codeInput);
    if (success) {
      alert(`✅ Promo code ${codeInput.toUpperCase()} applied successfully!`);
      setCodeInput('');
    } else {
      alert('Invalid promo code. Try FOOD20 or D10');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>Your cart is empty 😞</h3>
        <Link to="/menu" className="btn btn-primary mt-3">Go to Menu</Link>
      </div>
    );
  }

  // Helper function to get correct image based on category
  const getItemImage = (item) => {
    if (item.image) return item.image;
    
    switch (item.category) {
      case 'pizza': return "/assets/images/pizza-main.jpg";
      case 'burger': return "/assets/images/burger-main.jpg";
      case 'sandwich': return "/assets/images/sandwich-main.jpg";
      case 'tacos': return "/assets/images/tacos-main.jpg";
      case 'icecream': return "/assets/images/icecream-main.jpg";
      case 'friesbox': return "/assets/images/friesbox-main.jpg";
      default: return "/assets/images/pizza-main.jpg";
    }
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        <h2 className="mb-4">Your Cart ({cartItems.length} items)</h2>
        
        {cartItems.map((item, index) => (
          <div key={item.id || index} className="card mb-3 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                
                {/* Left: Image + Text */}
                <div className="d-flex gap-3 flex-grow-1">
                  {/* Miniature Image - Now correctly shows per category */}
                  <img 
                    src={getItemImage(item)}
                    alt={item.itemName || "Food Item"}
                    style={{ 
                      width: '90px', 
                      height: '90px', 
                      objectFit: 'cover', 
                      borderRadius: '10px',
                      flexShrink: 0
                    }}
                  />
                  
                  <div>
                    <h5 className="mb-1 fw-bold">{item.itemName || `Custom Item #${index + 1}`}</h5>
                    <small className="text-muted d-block">{item.customDescription}</small>
                  </div>
                </div>

                {/* Right Side: Price + Controls */}
                <div className="text-end ms-3" style={{ minWidth: '140px' }}>
                  <p className="fw-bold mb-2">₹{(item.price * (item.quantity || 1)).toFixed(2)}</p>
                  
                  <div className="d-flex align-items-center gap-2 justify-content-end">
                    <button 
                      className="btn btn-sm btn-outline-secondary" 
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    >
                      -
                    </button>
                    <span className="mx-2 fw-bold">{item.quantity || 1}</span>
                    <button 
                      className="btn btn-sm btn-outline-secondary" 
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                    
                    <button 
                      className="btn btn-sm btn-danger ms-3"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="col-lg-4">
        <div className="card sticky-top" style={{ top: '80px' }}>
          <div className="card-body">
            <h5>Order Summary</h5>
            
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && promoCode && (
              <div className="d-flex justify-content-between text-success">
                <span>Discount ({promoCode})</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <hr />
            
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="mt-4">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter promo code" 
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
              />
              <button 
                onClick={handleApplyPromo} 
                className="btn btn-outline-primary w-100 mt-2"
              >
                Apply Promo
              </button>
            </div>

            <Link to="/checkout" className="btn btn-success w-100 mt-4 py-3 fw-bold">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;