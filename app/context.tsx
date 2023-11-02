'use client';

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

import { Employees } from '@/types/Employees';

type ContextProps = {
  data?: Employees[];
  setData?: Dispatch<SetStateAction<Employees[] | undefined>>;
};

const DataContext = createContext<ContextProps>({
  data: [],
  setData: () => null,
});

type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<Employees[]>();

  return (
    <DataContext.Provider
      value={{
        data: data,
        setData: setData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
