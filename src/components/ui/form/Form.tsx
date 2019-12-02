import React, { FormEvent, useState } from 'react';
import { FormValidator } from './validators/FormValidator';

interface IProps<T, D> extends React.ComponentProps<any> {
  onChange?: (model: T, modelData: D) => void;
  onSubmit?: (model: T, modelData: D, errors: Record<string, string[]>, isValid: boolean | undefined) => void;
}

interface IFormContext {
  setModelFieldValue: (name: string, value: string | undefined, dataValue: any) => void;

  setModelFieldValidator: (name: string, inputValidators: FormValidator[]) => void;

  clearFieldValidation: (name: string) => void;

  getFieldErrors: (name: string) => string[];
}

export const FormContext = React.createContext<IFormContext>({
  setModelFieldValue: () => {},
  setModelFieldValidator: () => {},
  clearFieldValidation: () => {},
  getFieldErrors: () => [],
});

function mapToObject<T>(map: Map<any, any>): Record<string, T> {
  const object: Record<string, T> = {};

  map.forEach((value, key) => {
    object[key] = value;
  });

  return object;
}

/**
 * @param TModel Generic that describes form model in raw values of each form-bound element
 * @param TModelData Generic that describes form model in data values of each form-bound element
 */
export function Form<TModel = any, TModelData = any>(props: IProps<TModel, TModelData>) {
  const { onChange = () => {}, onSubmit = () => {}, children } = props;
  const [model, setModel] = useState(new Map<string, string | undefined>());
  const [data, setData] = useState(new Map<string, any>());
  const [errors, setErrors] = useState(new Map<string, string[]>());
  const [validators, setValidators] = useState(new Map<string, FormValidator[]>());

  const setModelFieldValue = (name: string, value: string | undefined, dataValue: any) => {
    model.set(name, value);
    data.set(name, dataValue);

    setModel(model);
    setData(data); // Check affects render

    onChange(
      (mapToObject<TModel>(model) as unknown) as TModel,
      (mapToObject<TModelData>(data) as unknown) as TModelData,
    );
  };

  const validate = (): Promise<boolean> => {
    return new Promise(resolve => {
      const errors = new Map<string, string[]>();
      let isValid: boolean = true;

      validators.forEach((fieldValidators, fieldName) => {
        fieldValidators.forEach(validator => {
          const result = validator.validate(model.get(fieldName));
          const currentErrors = errors.get(fieldName);
          const error = result.isValid ? null : result.errorText;

          if (error) {
            isValid = false;

            if (currentErrors) {
              errors.set(fieldName, currentErrors.concat([error]));
            } else {
              errors.set(fieldName, [error]);
            }
          }
        });
      });

      setErrors(errors);
      resolve(isValid);
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isValid = await validate();

    onSubmit(
      (mapToObject<TModel>(model) as unknown) as TModel,
      (mapToObject<TModelData>(data) as unknown) as TModelData,
      (mapToObject<Record<string, string[]>>(errors) as unknown) as {
        [key: string]: string[];
      },
      isValid,
    );
  };

  const setModelFieldValidator = (name: string, inputValidators: FormValidator[]) => {
    inputValidators.forEach(validator => {
      validator.modelGetter = () => {
        return mapToObject(model);
      };
    });

    validators.set(name, inputValidators);
  };

  const clearFieldValidation = (name: string) => {
    const fieldValidators = validators.get(name);

    if (fieldValidators) {
      fieldValidators.forEach(validator => {
        validator.clear();
      });
    }

    errors.set(name, []);

    setValidators(validators);
    setErrors(errors);
  };

  const getFieldErrors = (name: string): string[] => {
    const fieldErrors = errors.get(name);
    return fieldErrors ? fieldErrors : [];
  };

  return (
    <FormContext.Provider
      value={{
        setModelFieldValue,
        setModelFieldValidator,
        clearFieldValidation,
        getFieldErrors,
      }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
}
