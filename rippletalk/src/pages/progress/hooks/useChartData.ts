import { useEffect, useState } from 'react';

interface MoodTrendsData {
  date: string;
  high: number;
  low: number;
  total: number;
}

export default function useChartData() {
  const [moodTrends, setMoodTrends] = useState<MoodTrendsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
        
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await fetch(`${baseUrl}/mood-trends`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch mood trends: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // ✅ FIX: Extract first item from array
        if (Array.isArray(data) && data.length > 0) {
          setMoodTrends(data[0]);
        } else if (!Array.isArray(data)) {
          // In case API changes to return object directly
          setMoodTrends(data);
        } else {
          throw new Error('No mood trends data available');
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { moodTrends, loading, error };
}