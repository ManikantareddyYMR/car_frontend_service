import React, { useState } from 'react';
import { Edit2, Trash2, Car, DollarSign } from 'lucide-react';

const styles = {
  card: {
    background: 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.4))',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(51, 65, 85, 0.5)',
    borderRadius: '1rem',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  imageBox: {
    height: '12rem',
    background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  yearBadge: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(4px)',
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
  },
  yearText: {
    color: '#60a5fa',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  content: {
    padding: '1.25rem',
  },
  make: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.25rem',
  },
  model: {
    color: '#94a3b8',
    marginBottom: '1rem',
  },
  priceBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4ade80',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  editButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    background: 'rgba(59, 130, 246, 0.2)',
    color: '#60a5fa',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    padding: '0.625rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  deleteButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    background: 'rgba(239, 68, 68, 0.2)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    padding: '0.625rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  deleteConfirm: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
  },
  confirmBox: {
    textAlign: 'center',
  },
  confirmText: {
    color: 'white',
    marginBottom: '1rem',
  },
  confirmActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  confirmButton: {
    flex: 1,
    background: '#dc2626',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    background: '#475569',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

export default function CarCard({ car, onEdit, onDelete }) {
  const [showDelete, setShowDelete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered ? { borderColor: 'rgba(59, 130, 246, 0.5)', transform: 'translateY(-4px)' } : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageBox}>
        <Car size={80} color="rgba(59, 130, 246, 0.4)" />
        {car.yearOfManufacture && (
          <div style={styles.yearBadge}>
            <span style={styles.yearText}>{car.yearOfManufacture}</span>
          </div>
        )}
      </div>

      <div style={styles.content}>
        <h3 style={styles.make}>{car.make}</h3>
        <p style={styles.model}>{car.model}</p>

        {car.price && (
          <div style={styles.priceBox}>
            <DollarSign size={20} color="#4ade80" />
            <span style={styles.price}>{car.price.toLocaleString()}</span>
          </div>
        )}

        <div style={styles.actions}>
          <button onClick={() => onEdit(car)} style={styles.editButton}>
            <Edit2 size={16} />
            Edit
          </button>
          <button onClick={() => setShowDelete(true)} style={styles.deleteButton}>
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {showDelete && (
        <div style={styles.deleteConfirm}>
          <div style={styles.confirmBox}>
            <p style={styles.confirmText}>Delete this car?</p>
            <div style={styles.confirmActions}>
              <button
                onClick={() => {
                  onDelete(car.id);
                  setShowDelete(false);
                }}
                style={styles.confirmButton}
              >
                Delete
              </button>
              <button onClick={() => setShowDelete(false)} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

