import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContent';
import { Link } from 'react-router-dom';

const Productitem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const imageUrl = Array.isArray(image) && image.length > 0 ? image[0] : "/placeholder.png"; // fallback image

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={imageUrl}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default Productitem;
