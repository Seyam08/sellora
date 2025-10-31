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

export const getZodFormError = (formErrors: Array<string>): Array<string> => {
  let unknownKeys: string[] = [];

  if (formErrors.length > 0) {
    const match = formErrors[0].match(/"([^"]+)"/g);
    if (match) {
      unknownKeys = match.map((key) => key.replace(/"/g, ""));
    }
  }
  return unknownKeys;
};
