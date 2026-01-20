// ========================================
// src/components/SearchBar.jsx
// ========================================
import React from 'react';
import { Search } from 'lucide-react';

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1rem',
  },
  wrapper: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(51, 65, 85, 0.5)',
    borderRadius: '0.75rem',
    padding: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  searchWrapper: {
    gridColumn: 'span 2',
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    paddingLeft: '2.5rem',
    paddingRight: '1rem',
    paddingTop: '0.625rem',
    paddingBottom: '0.625rem',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid #334155',
    borderRadius: '0.5rem',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
  },
  searchIcon: {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  select: {
    width: '100%',
    padding: '0.625rem 1rem',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid #334155',
    borderRadius: '0.5rem',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    cursor: 'pointer',
  },
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  filterBrand,
  setFilterBrand,
  sortBy,
  setSortBy,
  brands,
}) {
  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.grid}>
          <div style={styles.searchWrapper}>
            <Search size={20} color="#94a3b8" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            style={styles.select}
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'All Brands' : brand}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
