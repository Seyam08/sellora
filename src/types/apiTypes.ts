export type SuccessResponse<T = undefined> = {
  message: string;
  data?: T;
};
export type ErrorResponse<T = undefined> = {
  message: string;
  error?: T;
};
