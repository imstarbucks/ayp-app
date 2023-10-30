export type Employees = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
};

export type TEmployeesResponse = {
  data?: Employees;
  loading: Boolean;
  error?: string;
};
