import React, { Dispatch, SetStateAction, useState } from 'react';

import { InputFields, InvalidType } from '@/types/InputFields';

type InputType = {
  label: string;
  name: string;
  type: 'email' | 'text' | 'tel';
  value: string;
  inputFields: InputFields;
  setInputFields: Dispatch<SetStateAction<InputFields>>;
};

const Input = ({
  label,
  name,
  type,
  value,
  inputFields,
  setInputFields,
}: InputType) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 text-xl">
        <label htmlFor={name}>{label}: </label>
        <input
          id={name}
          name={name}
          className="px-3 py-1"
          type={type}
          value={value}
          onChange={(e) => {
            type === 'email'
              ? setInputFields({
                  ...inputFields,
                  emailInput: { value: e.currentTarget.value },
                })
              : setInputFields({
                  ...inputFields,
                  nameInput: { value: e.currentTarget.value },
                });
          }}
        />
      </div>
      {type === 'email' ? (
        inputFields.emailInput.error ? (
          <span className="text-sm text-red self-end">
            {inputFields.emailInput.message}
          </span>
        ) : (
          <></>
        )
      ) : inputFields.nameInput.error ? (
        <span className="text-sm text-red self-end">
          {inputFields.nameInput.message}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
