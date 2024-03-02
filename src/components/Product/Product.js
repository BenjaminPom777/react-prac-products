// components/Product/Product.js
import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ id, name, description, price, creationDate, onClick, onDelete }) => {
  return (
    <div className="product">
        <div className='item' onClick={() => onClick(id)}>
      <h2>{name}</h2>
      <p>ID: {id}</p>
      {description && <p>Description: {description}</p>}
      <p>Price: ${price}</p>
      <p>Creation Date: {new Date(creationDate).toLocaleDateString()}</p>      
        </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  creationDate: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Product;
