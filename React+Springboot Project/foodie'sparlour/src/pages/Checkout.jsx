import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.jsx';

const Checkout = () => {
  const { cartItems, total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [checkoutType, setCheckoutType] = useState('pickup'); // pickup or delivery
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleConfirm = () => {
    if (checkoutType === 'delivery' && !deliveryAddress.trim()) {
      alert("Please enter your delivery address");
      return;
    }

    // Move to Payment page with necessary data
    navigate('/payment', { 
      state: { 
        checkoutType, 
        deliveryAddress: checkoutType === 'delivery' ? deliveryAddress : null,
        total 
      } 
    });
  };

  if (cartItems.length === 0) {
    return <div className="text-center py-5"><h3>Your cart is empty</h3></div>;
  }

  return (
    <div className="container mt-4">
      <Breadcrumbs productName="Checkout" />

      <h2 className="mb-4">Checkout</h2>

      <div className="row">
        <div className="col-lg-8">
          {/* Checkout Type */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="mb-3">Checkout Type</h5>
              
              <div className="form-check mb-3">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  id="pickup" 
                  checked={checkoutType === 'pickup'}
                  onChange={() => setCheckoutType('pickup')}
                />
                <label className="form-check-label d-flex align-items-center gap-2" htmlFor="pickup">
                  📍 Pickup from Store
                </label>
              </div>

              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  id="delivery" 
                  checked={checkoutType === 'delivery'}
                  onChange={() => setCheckoutType('delivery')}
                />
                <label className="form-check-label d-flex align-items-center gap-2" htmlFor="delivery">
                  🏠 Home Delivery
                </label>
              </div>
            </div>
          </div>

          {/* Address Section */}
          {checkoutType === 'pickup' && (
            <div className="card mb-4">
              <div className="card-body">
                <h5>Pickup Address</h5>
                <p className="text-muted">
                  Foodie's Parlour<br />
                  Siliguri Market Complex, Near Hong Kong Market<br />
                  Siliguri, West Bengal - 734001<br />
                  <strong>Timing:</strong> 11:00 AM - 10:00 PM
                </p>
              </div>
            </div>
          )}

          {checkoutType === 'delivery' && (
            <div className="card mb-4">
              <div className="card-body">
                <h5>Delivery Address</h5>
                <textarea 
                  className="form-control" 
                  rows="4"
                  placeholder="Enter your full delivery address..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '80px' }}>
            <div className="card-body">
              <h5>Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({cartItems.length})</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleConfirm}
                className="btn btn-success w-100 mt-4 py-3 fw-bold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;