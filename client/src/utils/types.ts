export type TStore = {
  username: string;
};

export type User = {
  username: string;
  password: string;
};

export enum HTTPmethods {
  POST = 'POST',
  GET = 'GET'
};

export type ResponseMessage = {
  success: boolean;
  error: string | null;
  username?: string;
};

export type Validator = (val: string) => { isValid: boolean, message: string };
export type Field = {
  value: string;
  isValid: boolean;
  touched: boolean;
  errors: string[];
  readonly validators: Validator[];
};