import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  useFormContext,
} from 'react-hook-form';

const parseFieldError = <T extends FieldValues>(
  error: NonNullable<DeepMap<T, FieldError>>[Path<T>]
) =>
  Array.isArray(error)
    ? error.map((err) => err.message).toString()
    : typeof error?.message === 'object'
    ? Object.entries(error.message)
        .map(([name, value]) => `[${name}]: ${value}`)
        .toString()
    : error?.message;

export const useErrorMessage = <T extends FieldValues>(
  name: Path<T>,
  label?: string
) => {
  const ctx = useFormContext<T>();
  const error = ctx.formState.errors?.[name];

  if (error) {
    return parseFieldError(error)?.replace(name, label || name);
  }
};
