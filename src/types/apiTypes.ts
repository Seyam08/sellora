export type SuccessResponse<T = undefined> = {
  message: string;
  data?: T;
};
export type ErrorResponse<T = undefined> = {
  errors: {
    message: string;
    error?: T;
  };
};
