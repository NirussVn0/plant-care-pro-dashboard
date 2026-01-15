
'use client';

import React from 'react';
import { PiPlant, PiDrop, PiSun, PiCode, PiDatabase } from 'react-icons/pi';
import styles from './Features.module.css';

export const Features = () => {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Cultivate perfection</h2>
        <p className={styles.subtitle}>Everything you need to keep your plants thriving.</p>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.span2}`}>
           <div style={{zIndex: 1}}>
             <PiPlant className={styles.cardIcon} />
             <h3 className={styles.cardTitle}>My Jungle</h3>
             <p className={styles.cardDesc}>
               Visualize your entire collection in one place. Track growth stages, locations, and specific needs for every single plant in your home.
             </p>
           </div>
           <PiPlant className={styles.cardBgIcon} />
        </div>

        <div className={styles.card}>
           <div style={{zIndex: 1}}>
             <PiDrop className={styles.cardIcon} />
             <h3 className={styles.cardTitle}>Smart Watering</h3>
             <p className={styles.cardDesc}>Never forget a watering day. Our algorithm adapts to seasons and species.</p>
           </div>
        </div>

        <div className={styles.card}>
           <div style={{zIndex: 1}}>
             <PiSun className={styles.cardIcon} />
             <h3 className={styles.cardTitle}>Light Tracker</h3>
             <p className={styles.cardDesc}>Optimal light positioning suggestions based on real-time data.</p>
           </div>
        </div>

        <div className={`${styles.card} ${styles.span2}`}>
           <div style={{zIndex: 1}}>
             <PiCode className={styles.cardIcon} />
             <h3 className={styles.cardTitle}>Built for Developers</h3>
             <p className={styles.cardDesc}>
               Showcasing clean OOP architecture, SOLID principles, and a modern Dockerized deployment pipeline. Explore the code behind the green.
             </p>
           </div>
           <PiCode className={styles.cardBgIcon} />
        </div>
      </div>
    </section>
  );
};
