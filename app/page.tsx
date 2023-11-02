'use client';

import { useEffect, useContext } from 'react';

import { TEmployeesResponse } from '@/types/Employees';
import { DataContext } from './context';

import { useFetch } from '@/hooks/useFetch';
import Table from '@/components/Table';

export default function Home() {
  const res: TEmployeesResponse = useFetch('/data/employees.json');
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    if (res && res.data?.employees) {
      setData(res.data.employees);
    }
  }, [res]);

  return (
    <main className="bg-background text-primary h-screen flex justify-center items-center">
      {res && <Table defaultData={data} loading={res.loading} />}
    </main>
  );
}
