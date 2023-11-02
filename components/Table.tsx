'use client';

import React, { useEffect, useState, useContext } from 'react';
import { Employees } from '@/types/Employees';

import { DataContext } from '@/app/context';

import Spinner from './Spinner';
import Search from './Search';
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
  const [_defaultData, setDefaultData] = useState<Employees[] | undefined>(
    defaultData
  );

  const [currentData, setCurrentData] = useState<Employees[] | undefined>(
    _defaultData
  );

  const { setModal, setModalData } = useModal();
  const { data, setData } = useContext(DataContext);

  const UpdateButton = ({ data }: UpdateButtonProps) => {
    const handleOnClick = (data?: Employees) => {
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
    // setCurrentData(_defaultData);
  }, [defaultData]);

  useEffect(() => {
    // setDefaultData(defaultData);
    setCurrentData(_defaultData);
  }, [_defaultData]);

  return (
    _defaultData && (
      <div className="w-3/4 lg:w-1/2">
        <Search defaultData={_defaultData} setCurrentData={setCurrentData} />
        <div className="border border-secondary relative mt-5">
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
          {currentData?.length <= 0 && (
            <div className="text-center">No record found.</div>
          )}
        </div>
      </div>
    )
  );
};

export default Table;
