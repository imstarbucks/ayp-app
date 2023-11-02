export type InputFields = {
  nameInput: InvalidType;
  emailInput: InvalidType;
};

export type InvalidType = {
  value: string;
  error?: boolean;
  invalidType?: 'email' | 'text';
  message?: string;
};
