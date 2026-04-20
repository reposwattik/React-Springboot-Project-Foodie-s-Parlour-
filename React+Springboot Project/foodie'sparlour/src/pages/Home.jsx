import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div 
      style={{
        backgroundImage: `url('/assets/images/hero-banner.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
        position: 'fixed',           // Changed to fixed to break out completely
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        zIndex: -1,                  // Behind navbar
        overflow: 'hidden'
      }}
    >
      {/* Dark Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.70)',
          zIndex: 1
        }}
      />

      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        maxWidth: '900px', 
        padding: '0 20px',
        width: '100%'
      }}>
        <h1 
          className="display-3 fw-bold mb-4"
          style={{ 
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
            fontSize: '3.8rem',
            lineHeight: '1.1'
          }}
        >
          Welcome to Foodie's Parlour
        </h1>
        
        <p 
          className="lead mb-5 fs-4"
          style={{ 
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
            maxWidth: '720px',
            margin: '0 auto 50px'
          }}
        >
          Delicious food, endless customizations – made just for you!
        </p>

        <div className="d-flex justify-content-center gap-4 flex-wrap">
          <Link 
            to="/menu" 
            className="btn btn-warning btn-lg px-5 py-3 fw-bold fs-5"
          >
            Browse Menu
          </Link>
          
          <Link 
            to="/cart" 
            className="btn btn-outline-light btn-lg px-5 py-3 fw-bold fs-5"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;