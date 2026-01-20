// ========================================
// src/services/carService.js
// ========================================

const API_BASE_URL = 'http://localhost:8081/api/cars';

export const carService = {
  async getCars() {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch cars');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cars:', error);
      return [];
    }
  },

  async addCar(cars, carData) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...carData,
          year: parseInt(carData.year),
          price: parseFloat(carData.price),
          mileage: parseInt(carData.mileage),
        }),
      });
      if (!response.ok) throw new Error('Failed to add car');
      const newCar = await response.json();
      return [...cars, newCar];
    } catch (error) {
      console.error('Error adding car:', error);
      return cars;
    }
  },

  async updateCar(cars, id, carData) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...carData,
          year: parseInt(carData.year),
          price: parseFloat(carData.price),
          mileage: parseInt(carData.mileage),
        }),
      });
      if (!response.ok) throw new Error('Failed to update car');
      const updatedCar = await response.json();
      return cars.map(car => (car.id === id ? updatedCar : car));
    } catch (error) {
      console.error('Error updating car:', error);
      return cars;
    }
  },

  async deleteCar(cars, id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete car');
      return cars.filter(car => car.id !== id);
    } catch (error) {
      console.error('Error deleting car:', error);
      return cars;
    }
  },

  filterCars(cars, searchTerm, filterBrand) {
    return cars.filter(car => {
      const matchesSearch =
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = filterBrand === 'all' || car.make === filterBrand;
      return matchesSearch && matchesBrand;
    });
  },

  sortCars(cars, sortBy) {
    const sorted = [...cars];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => b.year - a.year);
      case 'oldest':
        return sorted.sort((a, b) => a.year - b.year);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  },

  getStats(cars) {
    if (cars.length === 0) {
      return {
        totalCars: 0,
        avgYear: 0,
        totalValue: 0,
        totalBrands: 0,
      };
    }

    const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
    const avgYear = Math.round(
      cars.reduce((sum, car) => sum + car.year, 0) / cars.length
    );
    const brands = new Set(cars.map(car => car.make));

    return {
      totalCars: cars.length,
      avgYear,
      totalValue: Math.round(totalValue / 1000),
      totalBrands: brands.size,
    };
  },
};