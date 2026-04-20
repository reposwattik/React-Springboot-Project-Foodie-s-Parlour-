import { useParams } from 'react-router-dom';

import CustomizePizza from './CustomizePizza.jsx';
import CustomizeBurger from './CustomizeBurger.jsx';
import CustomizeSandwich from './CustomizeSandwich.jsx';
import CustomizeTacos from './CustomizeTacos.jsx';
import CustomizeIcecream from './CustomizeIcecream.jsx';
import CustomizeFriesBox from './CustomizeFriesBox.jsx';

const Customize = () => {
  const { category } = useParams();

  switch (category) {
    case 'pizza':
      return <CustomizePizza />;
    case 'burger':
      return <CustomizeBurger />;
    case 'sandwich':
      return <CustomizeSandwich />;
    case 'tacos':
      return <CustomizeTacos />;
    case 'icecream':
      return <CustomizeIcecream />;
    case 'friesbox':
      return <CustomizeFriesBox />;
    default:
      return <h3 className="text-center mt-5">Category not found</h3>;
  }
};

export default Customize;