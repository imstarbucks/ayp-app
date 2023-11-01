import { DialogHTMLAttributes, forwardRef, useRef, useState } from 'react';

import { Employees } from '@/types/Employees';

type ModalProps = {
  employeeId?: string;
  employeeName?: string;
  employeeEmail?: string;
  employeeStatus?: boolean;
};

const Modal = forwardRef(
  (
    { employeeName, employeeEmail, employeeStatus, employeeId }: ModalProps,
    ref
  ) => {
    const closeBtnRef = useRef(null);
    const [employeeInputName, setEmployeeInputName] = useState<string>(
      employeeName ? employeeName : ''
    );
    const [employeeInputEmail, setEmployeeEmail] = useState<string>(
      employeeEmail ? employeeEmail : ''
    );

    const employeeNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmployeeInputName(e.currentTarget.value);
    };

    const employeeEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmployeeEmail(e.currentTarget.value);
    };

    const handleCloseBtn = () => {
      ref?.current.close();
    };

    return (
      <dialog
        ref={ref}
        className="w-1/2 p-5 rounded-lg bg-secondary backdrop:bg-slate-900/30"
      >
        <div className="">
          <div className="text-3xl">ID: {employeeId}</div>
          <form action="">
            <div className="flex items-center my-5 gap-5 text-xl">
              <label htmlFor="employeeName">Name: </label>
              <input
                id="employeeName"
                name="employeeName"
                className="px-3 py-1"
                type="text"
                value={employeeInputName}
                defaultValue={employeeInputName}
                onChange={(e) => employeeNameOnChange(e)}
              />
            </div>
            <div className="flex items-center my-5 gap-5 text-xl">
              <label htmlFor="employeeEmail">Email: </label>{' '}
              <input
                id="employeeEmail"
                name="employeeEmail"
                className="px-3 py-1"
                type="email"
                value={employeeInputEmail}
                defaultValue={employeeInputEmail}
                onChange={(e) => employeeEmailOnChange(e)}
              />
            </div>
            <div className="flex items-center my-5 gap-5 text-xl">
              <label>Status: </label>
              <input
                type="checkbox"
                checked={employeeStatus ? true : false}
                defaultChecked={false}
              />
            </div>
            <button
              ref={closeBtnRef}
              onClick={() => handleCloseBtn()}
              className="bg-red px-3 py-2 rounded-sm text-secondary me-5"
              type="button"
            >
              Close
            </button>
            <button
              className="bg-green px-3 py-2 rounded-sm text-secondary"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </dialog>
    );
  }
);
export default Modal;
