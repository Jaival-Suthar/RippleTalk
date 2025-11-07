import { useState } from 'react';
import { useAuth } from '../../../context/useAuth';
import { usePoints } from '../../../context/usePoints';

type ApiResponse = {
  message: string;
  post: {
    _id: string;
    user: string;
    mood: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export const useEntrySubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { addPoints } = usePoints();

  const submit = async (type: 'high' | 'low', content: string): Promise<boolean> => {
    if (!token) {
      setError('You must be logged in to create a post');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || 'https://rippletalk-8.onrender.com';
      
      const response = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: type,
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to create post' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      // Award points for posting
      const points = type === 'high' ? 10 : 5;
      addPoints(`Posted ${type} moment`, points);
      
      console.log('Post created successfully:', data);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit entry';
      setError(errorMessage);
      console.error('Error submitting post:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};