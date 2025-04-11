import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MedicineCard from '../components/MedicineCard';
import { FaFilter, FaSort, FaSearch } from 'react-icons/fa';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [],
    brands: [],
    availability: 'all',
    rating: 0
  });
  const [sortBy, setSortBy] = useState('popularity');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryProducts = {
    medicines: [
      {
        medicineName: "Dolo 650mg",
        manufacturer: "Micro Labs Ltd",
        medicineType: "Tablet",
        quantity: "15 tablets",
        expiryDate: "Dec 2024",
        purpose: "Sell",
        originalPrice: 32.85,
        finalPrice: 29.50,
        discountPercentage: 10,
        image: "https://www.netmeds.com/images/product-v1/600x600/313655/dolo_650mg_tablet_15s_0.jpg"
      },
      {
        medicineName: "Crocin Advance",
        manufacturer: "GSK Pharmaceuticals Ltd",
        medicineType: "Tablet",
        quantity: "20 tablets",
        expiryDate: "Nov 2024",
        purpose: "Sell",
        originalPrice: 40.00,
        finalPrice: 34.00,
        discountPercentage: 15,
        image: "https://www.netmeds.com/images/product-v1/600x600/341494/crocin_advance_tablet_20s_0.jpg"
      }
    ],
    wellness: [
      {
        medicineName: "Vitamin C",
        manufacturer: "Abbott Healthcare Pvt Ltd",
        medicineType: "Supplement",
        quantity: "60 tablets",
        expiryDate: "Oct 2024",
        purpose: "Sell",
        originalPrice: 190.00,
        finalPrice: 171.00,
        discountPercentage: 10,
        image: "https://www.netmeds.com/images/product-v1/600x600/821304/limcee_vitamin_c_500mg_chewable_tablet_orange_15s_0.jpg"
      }
    ],
    labtests: [
      {
        medicineName: "Complete Blood Count",
        manufacturer: "Thyrocare",
        medicineType: "Diagnostic Test",
        quantity: "1 test",
        purpose: "Service",
        originalPrice: 400.00,
        finalPrice: 299.00,
        discountPercentage: 25,
        image: "https://www.netmeds.com/images/cms/wysiwyg/diagnostic/2019/Oct/1571296396_blood_test.jpg"
      }
    ]
  };

  useEffect(() => {
    setProducts(categoryProducts[category.toLowerCase()] || []);
  }, [category]);

  const getCategoryTitle = () => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{getCategoryTitle()}</h1>
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder={`Search in ${getCategoryTitle()}...`}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="category-content">
        <div className="filters-section">
          <div className="filters-header">
            <h3><FaFilter /> Filters</h3>
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            <label><input type="checkbox" onChange={() => handleFilterChange('priceRange', 'under500')} /> Under ₹500</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('priceRange', '500-1000')} /> ₹500 - ₹1000</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('priceRange', '1000-2000')} /> ₹1000 - ₹2000</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('priceRange', 'above2000')} /> Above ₹2000</label>
          </div>

          <div className="filter-group">
            <h4>Availability</h4>
            <label><input type="radio" name="availability" onChange={() => handleFilterChange('availability', 'all')} checked={filters.availability === 'all'} /> All</label>
            <label><input type="radio" name="availability" onChange={() => handleFilterChange('availability', 'inStock')} /> In Stock</label>
            <label><input type="radio" name="availability" onChange={() => handleFilterChange('availability', 'outOfStock')} /> Out of Stock</label>
          </div>

          <div className="filter-group">
            <h4>Discount</h4>
            <label><input type="checkbox" onChange={() => handleFilterChange('discount', 10)} /> 10% and above</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('discount', 20)} /> 20% and above</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('discount', 30)} /> 30% and above</label>
          </div>
        </div>

        <div className="products-section">
          <div className="products-header">
            <span>{products.length} Products</span>
            <div className="sort-section">
              <FaSort />
              <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
                <option value="popularity">Popularity</option>
                <option value="priceLowToHigh">Price - Low to High</option>
                <option value="priceHighToLow">Price - High to Low</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product, index) => (
                <MedicineCard key={index} medicine={product} />
              ))
            ) : (
              <div className="no-products">
                <p>No products found in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;