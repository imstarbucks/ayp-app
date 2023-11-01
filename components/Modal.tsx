'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';

import ToggleSwitch from '@/components/ToggleSwitch';

import { Employees } from '@/types/Employees';

const ModalContext = createContext();

type ModalProps = Employees;

const Modal: React.FC<ModalProps> = ({
  name,
  id,
  email,
  isActive,
}: ModalProps) => {
  const { modal, setModal } = useModal();

  const closeBtnRef = useRef(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCloseBtn = () => {
    setModal(false);
    modalRef?.current?.close();
  };

  useEffect(() => {
    if (modal) {
      modalRef.current?.showModal();
    }

    return;
  }, [modal]);

  return (
    <dialog
      ref={modalRef}
      className="p-5 rounded-lg bg-secondary backdrop:bg-slate-900/30"
    >
      <div className="">
        <div className="text-3xl">ID: {id}</div>
        <form action="">
          <div className="flex items-center my-5 gap-5 text-xl">
            <label htmlFor="employeeName">Name: </label>
            <input
              id="employeeName"
              name="employeeName"
              className="px-3 py-1"
              type="text"
              defaultValue={name}
              // onChange={(e) => employeeNameOnChange(e)}
            />
          </div>
          <div className="flex items-center my-5 gap-5 text-xl">
            <label htmlFor="employeeEmail">Email: </label>{' '}
            <input
              id="employeeEmail"
              name="employeeEmail"
              className="px-3 py-1"
              type="email"
              defaultValue={email}
              // onChange={(e) => employeeEmailOnChange(e)}
            />
          </div>
          <div className="flex items-center my-5 gap-5 text-xl">
            <label>Status: </label>
            <input type="checkbox" defaultChecked={isActive ? true : false} />
            <ToggleSwitch isActive={isActive} />
          </div>
          <button
            ref={closeBtnRef}
            onClick={() => handleCloseBtn()}
            className="bg-red px-3 py-2 rounded-md text-secondary me-5"
            type="button"
          >
            Close
          </button>
          <button
            className="bg-green px-3 py-2 rounded-md text-secondary"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </dialog>
  );
};

type ProviderProps = {
  children: React.ReactNode;
};

const ModalProvider: React.FC<ProviderProps> = (props) => {
  const [modalData, setModalData] = useState<Employees>({
    name: '',
    email: '',
    id: '',
    isActive: false,
  });
  const [modal, setModal] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ setModalData, modal, setModal }} {...props}>
      <Modal
        name={modalData.name}
        email={modalData.email}
        id={modalData.id}
        isActive={modalData.isActive}
      />
      {props.children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a UserProvider');
  }

  return context;
};

export default Modal;
export { ModalProvider, useModal };
