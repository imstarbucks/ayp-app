'use client';

import { useEffect, useState } from 'react';
import { Employees, TEmployeesResponse } from '@/types/Employees';

export const useFetch = (url: string): TEmployeesResponse => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async (url: string) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      console.log(json);
      setData(json);
    } catch (error) {
      setError(error);
      console.error('An error occured: ', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return { data, error, loading };
};
