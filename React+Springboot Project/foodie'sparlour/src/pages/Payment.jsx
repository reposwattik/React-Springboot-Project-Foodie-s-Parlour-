import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import axios from 'axios';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, clearCart, removeFromCart } = useContext(CartContext);
  
  const { total = 0, checkoutType = 'pickup' } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('credit');

  // Form fields for card (only shown for credit/debit)
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePay = async () => {
    try {
      // Delete all items from database one by one
      for (const item of cartItems) {
        if (item.id) {
          await axios.delete(`http://localhost:8090/api/orders/delete/${item.id}`);
        }
      }

      // Clear frontend cart
      clearCart();

      const methodName = paymentMethod === 'cash' ? 'Cash' : `${paymentMethod.toUpperCase()} Card`;

      alert(`✅ Order placed successfully!\nPayment Method: ${methodName}\nTotal Amount: ₹${total.toFixed(2)}\nThank you for ordering from Foodie's Parlour!`);

      navigate('/');   // Go back to home page

    } catch (err) {
      console.error("Payment processing failed", err);
      alert("❌ Something went wrong during payment. Please try again.");
    }
  };

  const isCardPayment = paymentMethod === 'credit' || paymentMethod === 'debit';

  return (
    <div className="container mt-5">
      <Breadcrumbs productName="Payment" />

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Payment Details</h3>

              <div className="mb-4">
                <h5 className="mb-3">Select Payment Method</h5>

                <div className="form-check mb-3">
                  <input 
                    type="radio" 
                    className="form-check-input" 
                    id="credit" 
                    checked={paymentMethod === 'credit'}
                    onChange={() => setPaymentMethod('credit')}
                  />
                  <label className="form-check-label" htmlFor="credit">Credit Card</label>
                </div>

                <div className="form-check mb-3">
                  <input 
                    type="radio" 
                    className="form-check-input" 
                    id="debit" 
                    checked={paymentMethod === 'debit'}
                    onChange={() => setPaymentMethod('debit')}
                  />
                  <label className="form-check-label" htmlFor="debit">Debit Card</label>
                </div>

                <div className="form-check">
                  <input 
                    type="radio" 
                    className="form-check-input" 
                    id="cash" 
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                  />
                  <label className="form-check-label" htmlFor="cash">Cash</label>
                </div>
              </div>

              {/* Card Fields - Only for Credit/Debit */}
              {isCardPayment && (
                <div className="mt-4">
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Name on Card</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="John Doe"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                    />
                  </div>

                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label">Expiry Date (MM/YY)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="12/28"
                        maxLength="5"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">CVV</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="123"
                        maxLength="4"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center mt-4">
                <h4 className="mb-3">Total Amount: ₹{total.toFixed(2)}</h4>
                
                <button 
                  onClick={handlePay}
                  className="btn btn-success btn-lg px-5 w-100"
                >
                  Pay ₹{total.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;