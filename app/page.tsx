'use client';

import { useEffect } from 'react';
import { TEmployeesResponse } from '@/types/Employees';
import { useFetch } from '@/hooks/useFetch';

export default function Home() {
  const data: TEmployeesResponse = useFetch('../data/employees.json');

  const Loading = () => {
    return <p className="text-xl">Loading data...</p>;
  };

  return (
    <main className="bg-background text-primary h-screen flex justify-center items-center">
      {data && data.loading ? <Loading /> : <></>}
    </main>
  );
}
