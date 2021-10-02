import { FormValue } from './form';

interface FormRule {
  key: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (value: string) => Promise<string | void>;
}

interface FormErrors {
  [K: string]: string[];
}

function isEmpty(value: any) {
  return value === null || value === undefined || value === '';
}

export function noError(errors: FormErrors) {
  return Object.keys(errors).length === 0;
}
type OneError = string | Promise<string | void>;

// 检验分开，容易测试
const Validator = (
  formValue: FormValue,
  rules: FormRule[],
  callback: (errors: any) => void
): void => {
  let errors: { [key: string]: OneError[] } = {};

  const addError = (key: string, error: OneError) => {
    if (errors[key] === undefined) {
      errors[key] = [];
    }
    errors[key].push(error);
  };

  rules.forEach((rule) => {
    const key = rule.key;
    const value = formValue[key];
    if (rule.validator) {
      const promise = rule.validator(value);
      addError(rule.key, promise);
    }
    if (rule.required && isEmpty(value)) {
      addError(key, 'required');
    }
    if (rule.min && !isEmpty(rule) && value.length < rule.min) {
      addError(key, 'min');
    }
    if (rule.max && !isEmpty(rule) && value.length > rule.max) {
      addError(key, 'max');
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      addError(key, 'pattern');
    }
  });
  function hasError(
    item: [string, undefined] | [string, string]
  ): item is [string, string] {
    return typeof item[1] === 'string';
  }
  const flattenErrors = flat(
    Object.keys(errors).map((key) =>
      errors[key].map<[string, OneError]>((error) => [key, error])
    )
  );
  const newPromises = flattenErrors.map(([key, promiseOrString]) => {
    const promise =
      promiseOrString instanceof Promise
        ? promiseOrString
        : Promise.reject(promiseOrString);
    return promise.then<[string, undefined], [string, string]>(
      // 成功
      () => [key, undefined],
      // 报错原因
      (reason) => [key, reason]
    );
  });
  Promise.all(newPromises).then((results) => {
    callback(zip(results.filter<[string, string]>(hasError)));
  });
};

export default Validator;

function flat<T>(array: Array<T | T[]>) {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] instanceof Array) {
      // @ts-ignore
      result.push(...(array[i] as T[]));
    } else {
      result.push(array[i] as T);
    }
  }
  return result;
}

function zip(kvList: Array<[string, string]>) {
  const result: { [key: string]: string[] } = {};
  kvList.map(([key, value]) => {
    result[key] = result[key] || [];
    result[key].push(value);
  });
  return result;
}
