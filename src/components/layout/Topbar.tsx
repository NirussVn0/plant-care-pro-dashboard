
'use client';

import React from 'react';
import { PiBell, PiGear, PiUser } from 'react-icons/pi';
import styles from './Topbar.module.css';

export const Topbar: React.FC = () => {
    return (
        <header className={styles.topbar}>
            <div className={styles.actions}>
                <input 
                    type="text" 
                    placeholder="Search plants..." 
                    className={styles.searchBar} 
                />
                
                <button className={styles.iconButton} aria-label="Notifications">
                    <PiBell size={24} />
                </button>
                
                <button className={styles.iconButton} aria-label="Settings">
                    <PiGear size={24} />
                </button>
                
                <div className={styles.avatar}>
                   {/* Placeholder for Avatar */}
                </div>
            </div>
        </header>
    );
};
