// components/Product/ProductDetails.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProductDetails = ({ product, onEdit, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setEditedProduct({ ...product });
    validateForm({ ...product }); // Validate on initial load
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

    // Validate on each input change
    validateForm({ ...editedProduct, [name]: value });
  };

  const validateForm = (data) => {
    const { name, price } = data;
    const isNameValid = name.trim() !== '';
    const isPriceValid = parseFloat(price) > 0;
    const formIsValid = isNameValid && isPriceValid;

    setIsValid(formIsValid);

    return formIsValid;
  };

  const handleSave = () => {
    if (validateForm(editedProduct)) {
      onEdit(editedProduct);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="product-details">
      <h2>Edit Product Details</h2>
      <label htmlFor="editedName">Name:</label>
      <input
        type="text"
        id="editedName"
        name="name"
        value={editedProduct.name}
        onChange={handleInputChange}
      />
      <label htmlFor="editedDescription">Description:</label>
      <textarea
        id="editedDescription"
        name="description"
        value={editedProduct.description}
        onChange={handleInputChange}
      />
      <label htmlFor="editedPrice">Price:</label>
      <input
        type="number"
        id="editedPrice"
        name="price"
        value={editedProduct.price}
        onChange={handleInputChange}
      />
      <button onClick={handleSave} disabled={!isValid}>
        Save
      </button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    creationDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductDetails;
