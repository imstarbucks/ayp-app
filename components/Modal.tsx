'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  FormEvent,
} from 'react';

import ToggleSwitch from '@/components/ToggleSwitch';
import Input from '@/components/Input';

import { Employees } from '@/types/Employees';
import { InputFields } from '@/types/InputFields';
import { DataContext } from '@/app/context';

const ModalContext = createContext();

type ModalProps = Employees;

const Modal: React.FC<ModalProps> = ({
  name,
  id,
  email,
  isActive,
}: ModalProps) => {
  const [inputFields, setInputFields] = useState<InputFields>({
    nameInput: { value: name },
    emailInput: { value: email },
  });

  const [isActiveToggle, setIsActiveToggle] = useState<boolean>(isActive);

  const { modal, setModal } = useModal();
  const { data, setData } = useContext(DataContext);

  const closeBtnRef = useRef(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseBtn = () => {
    setModal(false);
    modalRef?.current?.close();
  };

  const updateDataAction = (formData) => {
    const employeeData = {
      id: id,
      name: formData.get('employeeName'),
      email: formData.get('employeeEmail'),
      isActive: formData.get('employeeStatus') === 'on',
    };

    const newDefaultData =
      data?.map((d) => (d.id === id ? employeeData : d)) || [];

    setModal(false);
    setData(newDefaultData);
  };

  const onClickHandle = (e: FormEvent) => {
    e.preventDefault();
    console.log(inputFields.nameInput.value);
    let newInputFields: InputFields = inputFields;

    if (inputFields.nameInput.value === '') {
      newInputFields = {
        ...newInputFields,
        nameInput: {
          value: inputFields.nameInput.value,
          error: true,
          message: 'This field is required.',
        },
      };
    }

    if (inputFields.emailInput.value === '') {
      newInputFields = {
        ...newInputFields,
        emailInput: {
          value: inputFields.emailInput.value,
          error: true,
          message: 'This field is required.',
        },
      };
    }

    if (
      inputFields.emailInput.value !== '' &&
      !inputFields.emailInput.value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      newInputFields = {
        ...newInputFields,
        emailInput: {
          value: inputFields.emailInput.value,
          error: true,
          message: 'Please enter a valid email.',
        },
      };
    }

    setInputFields(newInputFields);

    if (!inputFields.emailInput.error && !inputFields.emailInput.error) {
      formRef.current?.requestSubmit();
    }
  };

  useEffect(() => {
    modal ? modalRef.current?.showModal() : modalRef.current?.close();

    return;
  }, [modal]);

  useEffect(() => {
    setInputFields({
      nameInput: { value: name },
      emailInput: { value: email },
    });
    setIsActiveToggle(isActive);
  }, [name, email, isActive]);

  return (
    <dialog
      ref={modalRef}
      className="p-5 rounded-lg bg-secondary backdrop:bg-slate-900/30"
    >
      <div className="">
        <div className="text-3xl">ID: {id}</div>
        <form ref={formRef} action={updateDataAction}>
          <div className="flex items-center my-5 gap-5 text-xl">
            <Input
              name="employeeName"
              type="text"
              value={inputFields.nameInput.value}
              setInputFields={setInputFields}
              inputFields={inputFields}
              label="Name"
            />
          </div>
          <div className="flex items-center my-5 gap-5 text-xl">
            <Input
              name="employeeEmail"
              type="email"
              value={inputFields.emailInput.value}
              setInputFields={setInputFields}
              inputFields={inputFields}
              label="Email"
            />
            {/* <input
              id="employeeEmail"
              name="employeeEmail"
              className="px-3 py-1"
              type="email"
              value={inputFields.emailInput.value}
              onChange={(e) =>
                setInputFields({
                  ...inputFields,
                  emailInput: {value: e.currentTarget.value},
                })
              }
              required
            /> */}
          </div>
          <div className="flex items-center my-5 gap-5 text-xl">
            <label>Status: </label>
            <ToggleSwitch isActive={isActiveToggle} />
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
            onClick={onClickHandle}
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
