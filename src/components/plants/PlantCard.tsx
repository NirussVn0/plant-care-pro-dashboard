
'use client';

import React from 'react';
import { PiSun, PiDrop } from 'react-icons/pi';
import styles from './PlantCard.module.css';
import { Plant } from '@/core/domain/Plant';

interface PlantCardProps {
  plant: Plant;
  onWater: (id: string) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onWater }) => {
  // Accessing props via getter or direct access if allowed. 
  // Since Plant wraps props, we use getters defined in Plant.ts
  
  const isThirsty = plant.isWateringDue();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <span className={`${styles.badge} ${isThirsty ? styles.badgeWarning : ''}`}>
          {isThirsty ? 'NEEDS WATER' : 'Healthy'}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={plant.imageUrl || 'https://images.unsplash.com/photo-1545241047-60f7fab979ae?q=80'} 
          alt={plant.name} 
          className={styles.plantImage}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{plant.name}</h3>
        <p className={styles.scientific}>{plant.species || 'Unknown Species'}</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>
             <PiSun color="#E9C46A" /> LIGHT
          </div>
          <div className={styles.progressBar}>
             <div 
               className={styles.progressFill} 
               style={{ 
                 width: plant.light === 'HIGH' ? '90%' : plant.light === 'MEDIUM' ? '60%' : '30%',
                 backgroundColor: '#E9C46A' 
               }}
             ></div>
          </div>
        </div>

        <div className={styles.statItem}>
           <div className={styles.statLabel}>
             <PiDrop color="#79CCDB" /> HUMIDITY
          </div>
          <div className={styles.progressBar}>
             <div 
               className={styles.progressFill} 
               style={{ 
                 width: plant.humidityRequirement === 'HIGH' ? '80%' : plant.humidityRequirement === 'MEDIUM' ? '50%' : '30%',
                 backgroundColor: '#79CCDB' 
               }}
             ></div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button 
           className={styles.actionButton}
           onClick={(e) => {
             e.stopPropagation();
             onWater(plant.id);
           }}
           style={{ marginBottom: '0.5rem' }}
        >
           {isThirsty ? 'Water Now' : 'Mark Watered'}
        </button>
        <a 
          href={`/my-jungle/${plant.id}`}
          className={styles.actionButton}
          style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}
        >
           View Details
        </a>
      </div>
    </div>
  );
};
