import { AxiosError } from "axios";

interface ValidateData {
  [k: string]: JSONValue; //被校验的数据可能是简单数据类型，也可能是复杂数据类型，因此ValidateData设置为递归的
}
type Rule<T> = {
  key: keyof T; //规则的key必须对应ValidateData中的key
  message: string;
} & ({ type: "required" } | { type: "pattern"; regex: RegExp } | { type: "notEqual"; value: JSONValue }); //type required和patter互斥
type Rules<T> = Rule<T>[]; //使用的时候根据Rules来获得代码提示

export type { Rule, Rules, ValidateData };

const isEmpty = (value: any) => {
  if (value === null || value === undefined || value === "") return true;
  return false;
};

export const validate = <T extends ValidateData>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[];
  };
  const errors: Errors = {};
  //遍历规则
  rules.forEach(rule => {
    const { key, type, message } = rule;
    const value = formData[key];

    switch (type) {
      case "required":
        if (isEmpty(value)) {
          errors[key] = errors[key] ?? []; //如果errors[key]不存在的话就先初始化为空数组，一个key根据规则可能匹配出多个error
          errors[key]?.push(message);
        }
        break;
      case "pattern":
        if (!isEmpty && !rule.regex.test(value!.toString())) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;

      case "notEqual":
        if (!isEmpty || value === rule.value) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
      default:
        console.log(value, type);
        return;
    }
  });
  return errors;
};

export const clearErrors = (errors: Record<string, string[]>) => {
  for (let key in errors) {
    errors[key] = [];
  }
};
export const hasError = (errors: Record<string, string[]>) => {
  let errorExist = false;
  for (let key in errors) {
    if (errors[key]?.length > 0) {
      errorExist = true;
      break;
    }
  }
  return errorExist;
};

export const onAxiosError = (error: any, errorCode: number, fn: Function, throwError: boolean = true) => {
  if (error.response) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === errorCode) {
      fn(axiosError.response.data);
    }
  }
  if (throwError) throw error;
};

export const assignErrors = (errorsForm: Record<string, string[]>, errors: Record<string, string[]>) => {
  clearErrors(errorsForm);
  Object.assign(errorsForm, errors);
};
