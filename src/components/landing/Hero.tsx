
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import { PiArrowRight } from 'react-icons/pi';
import styles from './Hero.module.css';

export const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Timeline for coordinated animations
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    tl.add({
      targets: [titleRef.current, subtitleRef.current, ctaRef.current],
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(200)
    })
    .add({
      targets: imageRef.current,
      translateX: [50, 0],
      opacity: [0, 1],
      duration: 1200
    }, '-=800');
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.blob + ' ' + styles.blob1}></div>
      <div className={styles.blob + ' ' + styles.blob2}></div>
      
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          Master Your <br />
          <span style={{ color: 'var(--co-primary-light)' }}>Urban Jungle</span>
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Track, nurture, and grow your plant collection with precision using our advanced, OOP-architected management system.
        </p>
        <Link href="/dashboard" ref={ctaRef} className={styles.ctaButton}>
          Get Started <PiArrowRight />
        </Link>
      </div>

      <div className={styles.imageContainer}>
        {/* Using a high-quality placeholder that matches the aesthetic */}
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1545241047-60f7fab979ae?q=80&w=2669&auto=format&fit=crop" 
          alt="Lush Monstera Plant" 
          className={styles.heroImage}
        />
      </div>
    </section>
  );
};
