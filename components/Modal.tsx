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
import { DataContext } from '@/app/context';

const ModalContext = createContext();

type ModalProps = Employees;

const Modal: React.FC<ModalProps> = ({
  name,
  id,
  email,
  isActive,
}: ModalProps) => {
  const [nameInput, setNameInput] = useState<string>(name);
  const [emailInput, setEmailInput] = useState<string>(email);

  const { modal, setModal } = useModal();
  const { data, setData } = useContext(DataContext);

  const closeBtnRef = useRef(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCloseBtn = () => {
    setModal(false);
    modalRef?.current?.close();
  };

  const updateDataAction = (formData) => {
    const employeeData = {
      id: id,
      name: formData.get('employeeName'),
      email: formData.get('employeeEmail'),
      isActive: formData.get('employeeStatus'),
    };

    // const newDefaultData = data?.map((d) => {
    //   if (d.id === id) {
    //     return employeeData;
    //   } else {
    //     return d;
    //   }
    // });

    const newDefaultData =
      data?.map((d) => (d.id === id ? employeeData : d)) || [];

    setModal(false);
    console.log('new', newDefaultData);
    setData(newDefaultData);
    console.log('new data', data);
  };

  useEffect(() => {
    if (modal) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }

    return;
  }, [modal]);

  useEffect(() => {
    setNameInput(name);
    setEmailInput(email);
  }, [name, email]);

  return (
    <dialog
      ref={modalRef}
      className="p-5 rounded-lg bg-secondary backdrop:bg-slate-900/30"
    >
      <div className="">
        <div className="text-3xl">ID: {id}</div>
        <form action={updateDataAction}>
          <div className="flex items-center my-5 gap-5 text-xl">
            <label htmlFor="employeeName">Name: </label>
            <input
              id="employeeName"
              name="employeeName"
              className="px-3 py-1"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.currentTarget.value)}
            />
          </div>
          <div className="flex items-center my-5 gap-5 text-xl">
            <label htmlFor="employeeEmail">Email: </label>{' '}
            <input
              id="employeeEmail"
              name="employeeEmail"
              className="px-3 py-1"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.currentTarget.value)}
            />
          </div>
          <div className="flex items-center my-5 gap-5 text-xl">
            <label>Status: </label>
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
    isActive: true,
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
