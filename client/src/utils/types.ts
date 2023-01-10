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