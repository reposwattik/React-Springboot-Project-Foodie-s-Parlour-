import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link 
      to={`/customize/${product.category}/${product.id}`}
      className="text-decoration-none"
    >
      <div className="card h-100 shadow-sm border-0 hover-shadow" 
           style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
        
        <img 
          src={product.image} 
          className="card-img-top" 
          alt={product.name}
          style={{ 
            height: "220px", 
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px"
          }}
        />
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-dark">{product.name}</h5>
          <p className="text-success fw-bold fs-5 mb-3">₹{product.price}</p>
          
          <div className="mt-auto">
            <button className="btn btn-warning w-100 fw-semibold">
              Customize & Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;