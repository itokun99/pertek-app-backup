export const createUrlParamFromObj = (params: any): string => {
  const result = Object.keys(params).map((key) => `${key}=${params[key]}`);

  // console.log("result ==>", result)
  return `?${result.join('&')}`;
};

export const createOptions = (data: any = [], keyLabel: string = 'name', keyValue: string = 'id') => {
  return data.map((d: any) => ({
    label: d[keyLabel],
    value: d[keyValue],
  }));
};
