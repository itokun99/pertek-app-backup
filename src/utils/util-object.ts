import { isArray, isEmpty } from "./assertion";

export type BasicObject = Record<string, string | string[] | number | number[] | null | undefined>;

export const clearEmptyObject = (object: BasicObject) => {
  const cleanedObject: BasicObject = {};
  Object.keys(object).forEach((key: string) => {
    if (
      object[key] === null ||
      object[key] === undefined ||
      object[key] === "" ||
      object[key] === "[]" ||
      (isArray(object[key]) && isEmpty(object[key]))
    ) {
      return;
    }
    cleanedObject[key] = object[key];
  });
  return cleanedObject;
};

export const clearFilterObject = (object: BasicObject) => {
  const cleanedObject: BasicObject = clearEmptyObject(object);

  Object.keys(cleanedObject).forEach((key: string) => {
    if (object[key] === "*") {
      delete cleanedObject[key];
    }
  });
  return cleanedObject;
};
