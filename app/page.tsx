'use client';

import { useEffect } from 'react';
import { TEmployeesResponse } from '@/types/Employees';
import { useFetch } from '@/hooks/useFetch';

import Table from '@/components/Table';

export default function Home() {
  const data: TEmployeesResponse = useFetch('../data/employees.json');

  return (
    <main className="bg-background text-primary h-screen flex justify-center items-center">
      {data && <Table data={data} />}
    </main>
  );
}
