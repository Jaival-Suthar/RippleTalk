import { useEffect, useState } from 'react';
import { fetchChartData } from '../../../utils/mockApi';
import type { ChartDataPoint } from '../../../types';

export const useChartData = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};