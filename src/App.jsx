// ========================================
// src/App.jsx
// ========================================
import React, { useState, useEffect } from 'react';
import { Car, Plus } from 'lucide-react';

import StatsCard from './components/StatsCard ';
import SearchBar from './components/SearchBar ';
import CarCard from './components/CarCard ';
import { carService } from './services/carService';
import FormModal from './components/FormModal ';

const styles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
  },
  header: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
    position: 'sticky',
    top: 0,
    zIndex: 40,
  },
  headerContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1.5rem 1rem',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  iconBox: {
    background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
    padding: '0.75rem',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    margin: 0,
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'linear-gradient(to right, #3b82f6, #9333ea)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.3s ease',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1.5rem 1rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  carGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '16rem',
  },
  spinner: {
    width: '3rem',
    height: '3rem',
    border: '4px solid #3b82f6',
    borderTop: '4px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 0',
  },
  emptyTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: '0.5rem',
  },
  emptyText: {
    color: '#64748b',
  },
};

export default function App() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    filterAndSortCars();
  }, [cars, searchTerm, filterBrand, sortBy]);

  async function loadCars() {
    setLoading(true);
    try {
      const data = await carService.getCars();
      setCars(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function filterAndSortCars() {
    let result = carService.filterCars(cars, searchTerm, filterBrand);
    result = carService.sortCars(result, sortBy);
    setFilteredCars(result);
  }

  async function handleSave(carData) {
    try {
      let updatedCars;
      if (editing) {
        updatedCars = await carService.updateCar(cars, editing.id, carData);
      } else {
        updatedCars = await carService.addCar(cars, carData);
      }
      setCars(updatedCars);
      setShowForm(false);
      setEditing(null);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id) {
    const updatedCars = await carService.deleteCar(cars, id);
    setCars(updatedCars);
  }

  function openAddForm() {
    setEditing(null);
    setShowForm(true);
  }

  function openEditForm(car) {
    setEditing(car);
    setShowForm(true);
  }

  const brands = ['all', ...new Set(cars.map(c => c.make))];
  const stats = carService.getStats(cars);

  return (
    <div style={styles.app}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        button:hover {
          transform: scale(1.05);
        }
      `}</style>

      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.headerContent}>
            <div style={styles.headerLeft}>
              <div style={styles.iconBox}>
                <Car size={32} color="white" />
              </div>
              <div>
                <h1 style={styles.title}>Car Service Pro</h1>
                <p style={styles.subtitle}>Manage your inventory with ease</p>
              </div>
            </div>
            <button onClick={openAddForm} style={styles.addButton}>
              <Plus size={20} />
              Add New Car
            </button>
          </div>
        </div>
      </header>

      <div style={styles.container}>
        <div style={styles.statsGrid}>
          <StatsCard title="Total Cars" value={stats.totalCars} icon="car" color="blue" />
          <StatsCard title="Avg Year" value={stats.avgYear} icon="calendar" color="purple" />
          <StatsCard title="Total Value" value={`$${stats.totalValue}k`} icon="dollar" color="green" />
          <StatsCard title="Brands" value={stats.totalBrands} icon="zap" color="orange" />
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterBrand={filterBrand}
          setFilterBrand={setFilterBrand}
          sortBy={sortBy}
          setSortBy={setSortBy}
          brands={brands}
        />

        {loading ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
          </div>
        ) : filteredCars.length === 0 ? (
          <div style={styles.emptyState}>
            <Car size={64} color="#475569" style={{ margin: '0 auto 1rem' }} />
            <h3 style={styles.emptyTitle}>No cars found</h3>
            <p style={styles.emptyText}>Add your first car to get started</p>
          </div>
        ) : (
          <div style={styles.carGrid}>
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} onEdit={openEditForm} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <FormModal
          car={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}