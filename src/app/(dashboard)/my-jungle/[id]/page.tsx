
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct hook for App Router
import { useParams } from 'next/navigation';
import { PlantService } from '@/core/services/PlantService';
import { LocalPlantRepository } from '@/core/infrastructure/LocalPlantRepository';
import { Plant } from '@/core/domain/Plant';
import { PiArrowLeft, PiDrop, PiSun } from 'react-icons/pi';
import Link from 'next/link';

// Service instance
const repo = new LocalPlantRepository();
const service = new PlantService(repo);

export default function PlantDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
       service.getAllPlants().then(plants => {
           const found = plants.find(p => p.id === id);
           setPlant(found || null);
           setLoading(false);
       });
    }
  }, [id]);

  if (loading) return <div>Loading plant details...</div>;
  if (!plant) return <div>Plant not found.</div>;

  return (
    <div>
      <Link href="/my-jungle" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', color: 'var(--co-text-muted)', fontWeight: 500 }}>
         <PiArrowLeft /> Back to Jungle
      </Link>

      <div style={{ background: 'white', borderRadius: 'var(--rd-lg)', overflow: 'hidden', boxShadow: 'var(--sh-md)' }}>
         <div style={{ height: '300px', background: '#e9f5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={plant.imageUrl} alt={plant.name} style={{ height: '100%', objectFit: 'contain' }} />
         </div>
         
         <div style={{ padding: 'var(--sp-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-lg)' }}>
                <div>
                   <h1 style={{ fontSize: '2rem', color: 'var(--co-text-main)', marginBottom: '0.5rem' }}>{plant.name}</h1>
                   <p style={{ fontSize: '1.1rem', color: 'var(--co-primary-light)', fontStyle: 'italic' }}>{plant.species}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ background: 'var(--co-primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--rd-full)', fontWeight: 600, fontSize: '0.9rem' }}>
                      {plant.isWateringDue() ? 'Thirsty' : 'Happy'}
                   </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-lg)' }}>
               <div style={{ background: 'var(--co-bg-main)', padding: 'var(--sp-md)', borderRadius: 'var(--rd-md)' }}>
                  <h3 style={{ fontSize: '0.9rem', color: 'var(--co-text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <PiSun style={{color: '#E9C46A'}} /> LIGHT
                  </h3>
                  <p style={{ fontWeight: 600 }}>{plant.light}</p>
               </div>
               
               <div style={{ background: 'var(--co-bg-main)', padding: 'var(--sp-md)', borderRadius: 'var(--rd-md)' }}>
                  <h3 style={{ fontSize: '0.9rem', color: 'var(--co-text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <PiDrop style={{color: '#79CCDB'}} /> HUMIDITY
                  </h3>
                   <p style={{ fontWeight: 600 }}>{plant.humidityRequirement}</p>
               </div>

               <div style={{ background: 'var(--co-bg-main)', padding: 'var(--sp-md)', borderRadius: 'var(--rd-md)' }}>
                  <h3 style={{ fontSize: '0.9rem', color: 'var(--co-text-muted)', marginBottom: '0.5rem' }}>LOCATION</h3>
                  <p style={{ fontWeight: 600 }}>{plant.location}</p>
               </div>
            </div>

            <div style={{ marginTop: 'var(--sp-xl)' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--co-primary-dark)' }}>Care History</h3>
                <p style={{ color: 'var(--co-text-muted)' }}>No logs yet. (Feature coming in next subtask)</p>
            </div>
         </div>
      </div>
    </div>
  );
}
