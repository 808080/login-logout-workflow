import { writable } from 'svelte/store';
import type { Field, Validator } from './types';

const reg = new RegExp(/^[^\\/,.^]+$/, 'gm');

//field validators
export const isNotEmpty: Validator = (val: string) => ({
  isValid: val.trim().length > 0,
  message: 'Required'
});
export const hasNoInvalidChars: Validator = (val: string) => ({
  isValid: Boolean(val.match(reg)),
  message: 'Must not contain ,.^\\/'
});

//form validation
export const validateField = (val: string, validators: Validator[]) => {
  const errors: string[] = [];
  const isValid = validators.every(validator => {
    const v = validator(val);
    if (!v.isValid) errors.push(v.message);
    return v.isValid
  });

  return {
    isValid,
    errors,
  };
};

export const buildForm = (fields: { name: string, validation: Validator[] }[]) => {
  const form = fields.reduce((res: { [key: string]: Field }, field) => {
    res[field.name] = {
      value: '',
      isValid: true,
      touched: false,
      validators: field.validation,
      errors: []
    };
    return res;
  }, {});

  const { subscribe, set, update } = writable(form);

  const validateForm = (): boolean => {
    let isFormValid = true;
    for (const field in form) {
      const validation = validateField(form[field].value, form[field].validators);

      if (isFormValid && !validation.isValid) isFormValid = false;

      form[field].isValid = validation.isValid;
      form[field].errors = validation.errors;
    }

    set(form);
    return isFormValid;
  };

  return {
    subscribe,
    set,
    update,
    validateForm
  };
}