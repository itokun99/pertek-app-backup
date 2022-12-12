export const isArray = (value: any) => {
  return Array.isArray(value);
};

export const isEmpty = (value: any) => {
  return value === null || value === undefined || value === "";
};

export const isObject = (value: any): value is Record<string, any> => {
  if (isArray(value) || value === null) return false;
  return typeof value === "object" || typeof value === "function";
};
