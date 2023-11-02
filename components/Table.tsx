'use client';

import React, { useEffect, useState } from 'react';
import { Employees } from '@/types/Employees';

import Spinner from './Spinner';
import { useModal } from './Modal';

type TableProps = {
  defaultData?: Employees[];
  modalData?: Employees[];
  loading: boolean;
};

type UpdateButtonProps = {
  data?: Employees;
};

const Table = ({ defaultData, loading }: TableProps) => {
  const [_defaultData, setDefaultData] = useState<Employees[]>(
    defaultData || []
  );

  const [currentData, setCurrentData] = useState<Employees[]>(
    _defaultData || []
  );

  const { setModal, setModalData } = useModal();

  const UpdateButton = ({ data }: UpdateButtonProps) => {
    const handleOnClick = (data?: Employees) => {
      console.log(data);
      setModalData(data);
      setModal(true);
    };
    return (
      <button
        onClick={() => handleOnClick(data)}
        type="button"
        className="rounded-md px-5 py-2 bg-slate-500 hover:bg-primary hover:text-background transition"
      >
        Update
      </button>
    );
  };

  useEffect(() => {
    setDefaultData(defaultData);
    setCurrentData(_defaultData);
  }, [defaultData]);

  return (
    defaultData && (
      <div className="w-1/2 border border-secondary relative">
        {loading ? <Spinner /> : <></>}
        <table className="table-auto justify-center bg-primary w-full">
          <thead>
            <tr className="text-left">
              <th className="p-3 text-background">ID</th>
              <th className="p-3 text-background">Name</th>
              <th className="p-3 text-background">Email</th>
              <th className="p-3 text-background">Status</th>
              <th className="p-3 text-background">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData?.map((d) => (
              <tr
                key={`${d.id + d.name}`}
                className="odd:bg-background odd:text-secondary bg-primary
                text-background"
              >
                <td className="p-3">{d.id}</td>
                <td className="p-3">{d.name}</td>
                <td className="p-3">{d.email}</td>
                <td
                  className={`p-3
                      ${d.isActive ? 'text-green' : 'text-red'}`}
                >
                  {d.isActive ? 'Active' : 'Deactivated'}
                </td>
                <td className="p-3">
                  {d.isActive ? <UpdateButton data={d} /> : <></>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Table;
