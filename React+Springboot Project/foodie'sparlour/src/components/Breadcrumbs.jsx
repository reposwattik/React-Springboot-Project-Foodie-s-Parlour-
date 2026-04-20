import { Link } from 'react-router-dom';

const Breadcrumbs = ({ productName }) => {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/menu">Menu</Link>
        </li>
        {productName && (
          <li className="breadcrumb-item active" aria-current="page">
            {productName}
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;