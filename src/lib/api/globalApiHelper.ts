export type ContentReturn = "json" | "form-data" | "invalid";

export const checkContentType = (contentType: string | null): ContentReturn => {
  if (contentType?.includes("application/json")) {
    return "json";
  }
  if (contentType?.includes("multipart/form-data")) {
    return "form-data";
  }
  return "invalid";
};
