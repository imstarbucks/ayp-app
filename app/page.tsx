'use client';

import { useEffect } from 'react';
import { TEmployeesResponse } from '@/types/Employees';
import { useFetch } from '@/hooks/useFetch';

import Table from '@/components/Table';

export default function Home() {
  const res: TEmployeesResponse = useFetch('/data/employees.json');

  return (
    <main className="bg-background text-primary h-screen flex justify-center items-center">
      {res && <Table data={res.data?.employees} loading={res.loading} />}
    </main>
  );
}
