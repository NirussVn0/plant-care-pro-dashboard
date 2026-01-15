
'use client';

import React, { useEffect, useState } from 'react';
import { Plant } from '@/core/domain/Plant';
import { PlantService } from '@/core/services/PlantService';
import { LocalPlantRepository } from '@/core/infrastructure/LocalPlantRepository';
import { PlantCard } from '@/components/plants/PlantCard';
import { PiPlus } from 'react-icons/pi';

// Service instantiation (In a real app, use Dependency Injection container)
const repo = new LocalPlantRepository();
const service = new PlantService(repo);

export default function MyJunglePage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlants = React.useCallback(async () => {
    setLoading(true);
    const data = await service.getAllPlants();
    setPlants(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  const handleWater = async (id: string) => {
    await service.waterPlant(id);
    fetchPlants(); // Refresh
  };

  const seedData = async () => {
    // Seed some initial plants if empty
    await service.registerPlant({
        name: 'Monstera Deliciosa',
        species: 'Swiss Cheese Plant',
        location: 'Living Room',
        waterScheduleDays: 7,
        lightRequirement: 'MEDIUM',
        humidityRequirement: 'HIGH',
        acquiredDate: new Date(),
        imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=2664&auto=format&fit=crop',
        lastWateredDate: new Date(Date.now() - 86400000 * 8) // Water 8 days ago (Thirsty)
    });
    await service.registerPlant({
        name: 'Fiddle Leaf Fig',
        species: 'Ficus Lyrata',
        location: 'Bedroom',
        waterScheduleDays: 10,
        lightRequirement: 'HIGH',
        humidityRequirement: 'MEDIUM',
        acquiredDate: new Date(),
        imageUrl: 'https://images.unsplash.com/photo-1597055181300-e313d4229ea4?q=80&w=2574&auto=format&fit=crop'
    });
    fetchPlants();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
         <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--co-primary-dark)' }}>My Jungle</h1>
            <p style={{ color: 'var(--co-text-muted)' }}>Manage and track your personal plant collection.</p>
         </div>
         <button 
           onClick={seedData}
           style={{
             display: 'flex', alignItems: 'center', gap: '8px',
             background: 'var(--co-primary)', color: 'white', border: 'none',
             padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
           }}
         >
           <PiPlus /> Add New Plant (Seed)
         </button>
      </div>

      {loading ? (
        <p>Loading your jungle...</p>
      ) : (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '1.5rem' 
        }}>
          {plants.length === 0 ? (
             <p>No plants yet. Click "Add New Plant" to start!</p>
          ) : (
             plants.map(plant => (
                <PlantCard key={plant.id} plant={plant} onWater={handleWater} />
             ))
          )}
        </div>
      )}
    </div>
  );
}
