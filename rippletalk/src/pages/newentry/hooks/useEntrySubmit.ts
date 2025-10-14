import { useState } from 'react';
import { submitPost } from '../../../utils/mockApi';
import { usePoints } from '../../../context/usePoints';

export const useEntrySubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addPoints } = usePoints();

  const submit = async (type: 'high' | 'low', content: string) => {
    setLoading(true);
    setError(null);
    try {
      const post = await submitPost(type, content);
      addPoints(`Posted ${type}`, post.points);
      return post;
    } catch (err) {
      setError('Failed to submit');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};