import { ErrorResponse, SuccessResponse } from "@/types/api/ResponseTypes";

export const registerUser = async (
  url: string,
  { arg }: { arg: FormData }
): Promise<SuccessResponse> => {
  const res = await fetch(url, {
    method: "POST",
    body: arg,
  });

  const data = await res.json();

  if (!res.ok) {
    // Return clean error object (throw it so SWR handles it as `error`)
    const errorData: ErrorResponse = data;
    const message = errorData.errors.message;
    const fields = errorData.errors.error ?? {};
    throw { message, fields };
  }

  return data as SuccessResponse;
};
