import React, { useState, useEffect } from 'react';
import Product from '../../components/Product/Product';
import ProductDetails from '../../components/Product/ProductDetails';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortedBy, setSortedBy] = useState('name');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));

    if (storedProducts && storedProducts.length > 0) {
      setProducts(sortAndFilterProducts(storedProducts, sortedBy, searchText));
    } else {
      const initialProducts = [
        {
          id: 1,
          name: 'Sample Product 1',
          description: 'This is a sample product description.',
          price: 29.99,
          creationDate: new Date('2024-03-02'),
        },
        // Add more initial products as needed
      ];

      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, [sortedBy, searchText]);

  const sortAndFilterProducts = (productList, sortBy, search) => {
    let sortedAndFilteredProducts = [...productList];

    // Sorting
    sortedAndFilteredProducts.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'creationDate') {
        return new Date(a.creationDate) - new Date(b.creationDate);
      }
      return 0;
    });

    // Filtering
    if (search) {
      const searchLower = search.toLowerCase();
      sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }

    return sortedAndFilteredProducts;
  };

  const handleProductClick = (productId) => {
    setSelectedProduct(products.find((product) => product.id === productId));
  };

  const handleEditProduct = (editedProduct) => {
    const existingProduct = products.some((product) => product.id === editedProduct.id);

    let updatedProducts;

    if (existingProduct) {
      updatedProducts = products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
    } else {
      updatedProducts = [...products, editedProduct];
    }

    setProducts(sortAndFilterProducts(updatedProducts, sortedBy, searchText));
    setSelectedProduct(null);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);

    setProducts(sortAndFilterProducts(updatedProducts, sortedBy, searchText));
    setSelectedProduct(null);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: '',
      description: '',
      price: 0,
      creationDate: new Date(),
    };

    setSelectedProduct(newProduct);
  };

  const handleSaveNewProduct = () => {
    if (selectedProduct) {
      const updatedProducts = [...products, selectedProduct];
      setProducts(sortAndFilterProducts(updatedProducts, sortedBy, searchText));
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setSelectedProduct(null);
    }
  };

  const handleCancelAddProduct = () => {
    setSelectedProduct(null);
  };

  const handleSortChange = (e) => {
    setSortedBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="home-container">
      <div className="product-list">
        <h1>Welcome to our Online Store</h1>
        <div>
          <label htmlFor="sortCriteria">Sort By:</label>
          <select id="sortCriteria" onChange={handleSortChange} value={sortedBy}>
            <option value="name">Name</option>
            <option value="creationDate">Creation Date</option>
          </select>
        </div>
        <div>
          <label htmlFor="searchText">Search:</label>
          <input
            type="text"
            id="searchText"
            onChange={handleSearchChange}
            value={searchText}
            placeholder="Type to search"
          />
        </div>
        {currentProducts.map((product) => (
          <Product
            key={product.id}
            {...product}
            onClick={handleProductClick}
            onDelete={handleDeleteProduct}
          />
        ))}
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onEdit={handleEditProduct}
            onCancel={handleCancelAddProduct}
            onSave={handleSaveNewProduct}
          />
        )}
           <button onClick={handleAddProduct}>Add New Product</button>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
