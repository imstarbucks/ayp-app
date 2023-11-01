import React from 'react';
import { Employees } from '@/types/Employees';

import Spinner from './Spinner';

type TableProps = {
  data?: Employees[];
  loading: boolean;
};

const Table = ({ data, loading }: TableProps) => {
  const UpdateButton = () => {
    return (
      <button
        type="button"
        className="rounded-md px-5 py-2 bg-slate-500 hover:bg-primary hover:text-background transition"
      >
        Update
      </button>
    );
  };

  return (
    data && (
      <div className="w-1/2 border border-secondary relative">
        {loading ? <Spinner /> : <></>}
        {/* <Spinner /> */}
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
            {data?.map((d, i) => (
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
                <td className="p-3">{d.isActive ? <UpdateButton /> : <></>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Table;
