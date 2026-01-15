
'use client';

import React, { useEffect, useState } from 'react';
import { TaskService } from '@/core/services/TaskService';
import { LocalPlantRepository } from '@/core/infrastructure/LocalPlantRepository';
import { Task } from '@/core/domain/Task';
import { PiCheckCircle, PiDrop } from 'react-icons/pi';

const taskService = new TaskService(new LocalPlantRepository());

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = React.useCallback(async () => {
    setLoading(true);
    const data = await taskService.getDailyTasks();
    setTasks(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleComplete = async (task: Task) => {
      await taskService.completeTask(task.id, task.plantId);
      fetchTasks();
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--co-primary-dark)' }}>Greenhouse Overview</h1>
      <p style={{ color: 'var(--co-text-muted)', marginBottom: '2rem' }}>
          Welcome back! You have {tasks.length} plants needing attention today.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem',
      }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--sh-sm)' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Daily Tasks <span style={{ background: '#E9F5F2', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--co-primary)' }}>{tasks.length} Total</span>
          </h3>
          
          {loading ? <p>Checklist loading...</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {tasks.length === 0 ? <p style={{color: 'var(--co-text-muted)'}}>All clear! Relax.</p> : tasks.map(task => (
                      <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '10px', borderRadius: '8px', border: '1px solid var(--co-border)' }}>
                          <div style={{ 
                              width: '40px', height: '40px', borderRadius: '50%', background: 'var(--co-accent-sage)', 
                              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--co-primary)'
                          }}>
                              <PiDrop />
                          </div>
                          <div style={{ flex: 1 }}>
                              <h4 style={{ margin: 0 }}>Watering: {task.plantName}</h4>
                              <span style={{ fontSize: '0.8rem', color: 'var(--co-text-muted)' }}>Due: Now</span>
                          </div>
                          <button 
                             onClick={() => handleComplete(task)}
                             style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--co-primary)', fontSize: '1.5rem' }}
                          >
                              <PiCheckCircle />
                          </button>
                      </div>
                  ))}
              </div>
          )}
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--sh-sm)' }}>
          <h3>Growth Trends</h3>
          <p style={{ marginTop: '1rem', color: 'var(--co-text-muted)' }}>Functionality coming soon...</p>
        </div>
      </div>
    </div>
  );
}
