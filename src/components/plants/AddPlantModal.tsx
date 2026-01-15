
'use client';

import React, { useState } from 'react';
import { PiX } from 'react-icons/pi';
import styles from './AddPlantModal.module.css';
import { PlantProps } from '@/core/domain/Plant';

interface AddPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PlantProps) => Promise<void>;
}

export const AddPlantModal: React.FC<AddPlantModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<PlantProps>>({
    name: '',
    species: '',
    location: '',
    waterScheduleDays: 7,
    lightRequirement: 'MEDIUM',
    humidityRequirement: 'MEDIUM'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'waterScheduleDays' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.species) {
      setError('Name and Species are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Default values for required fields not in form
      const plantData: PlantProps = {
        name: formData.name,
        species: formData.species,
        location: formData.location || 'Home',
        waterScheduleDays: formData.waterScheduleDays || 7,
        lightRequirement: (formData.lightRequirement as any) || 'MEDIUM',
        humidityRequirement: (formData.humidityRequirement as any) || 'MEDIUM',
        acquiredDate: new Date(),
        imageUrl: '', // Optional in interface
        lastWateredDate: new Date()
      };
      
      await onSubmit(plantData);
      onClose(); // Close on success
      setFormData({ // Reset
          name: '', species: '', location: '', waterScheduleDays: 7, 
          lightRequirement: 'MEDIUM', humidityRequirement: 'MEDIUM' 
      }); 
    } catch (err) {
      console.error(err);
      setError('Failed to add plant. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add New Plant</h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close">
            <PiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Plant Name *</label>
            <input 
              id="name"
              name="name"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Monstera Deliciosa"
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
             <label className={styles.label} htmlFor="species">Species/Type *</label>
             <input 
               id="species"
               name="species"
               className={styles.input}
               value={formData.species}
               onChange={handleChange}
               placeholder="e.g., Swiss Cheese Plant"
             />
          </div>

          <div className={styles.formGroup}>
             <label className={styles.label} htmlFor="location">Location</label>
             <input 
               id="location"
               name="location"
               className={styles.input}
               value={formData.location}
               onChange={handleChange}
               placeholder="e.g., Living Room"
             />
          </div>

          <div className={styles.formGroup}>
             <label className={styles.label} htmlFor="waterScheduleDays">Watering Frequency (Days)</label>
             <input 
               id="waterScheduleDays"
               name="waterScheduleDays"
               type="number"
               min="1"
               className={styles.input}
               value={formData.waterScheduleDays}
               onChange={handleChange}
             />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                 <label className={styles.label} htmlFor="lightRequirement">Light Needs</label>
                 <select 
                   id="lightRequirement"
                   name="lightRequirement"
                   className={styles.select}
                   value={formData.lightRequirement}
                   onChange={handleChange}
                 >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                 </select>
              </div>

              <div className={styles.formGroup} style={{ flex: 1 }}>
                 <label className={styles.label} htmlFor="humidityRequirement">Humidity</label>
                 <select 
                   id="humidityRequirement"
                   name="humidityRequirement"
                   className={styles.select}
                   value={formData.humidityRequirement}
                   onChange={handleChange}
                 >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                 </select>
              </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={`${styles.button} ${styles.cancelBtn}`}>
               Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className={`${styles.button} ${styles.submitBtn}`}>
               {isSubmitting ? 'Adding...' : 'Add Plant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
