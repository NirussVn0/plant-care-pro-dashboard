
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiPlant, PiCalendarCheck, PiBookOpen, PiChartBar, PiHouse } from 'react-icons/pi';
import styles from './Sidebar.module.css';

interface NavItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItemProps[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <PiHouse size={22} /> },
  { label: 'My Jungle', href: '/my-jungle', icon: <PiPlant size={22} /> },
  { label: 'Schedule', href: '/schedule', icon: <PiCalendarCheck size={22} /> },
  { label: 'Encyclopedia', href: '/encyclopedia', icon: <PiBookOpen size={22} /> },
  { label: 'Care Logs', href: '/care-logs', icon: <PiChartBar size={22} /> },
];

export const Sidebar: React.FC = () => {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
               <PiPlant size={32} />
               <span className={styles.logoText}>PlantCarePro</span>
            </div>
            
            <nav className={styles.nav}>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                           key={item.href} 
                           href={item.href} 
                           className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};
