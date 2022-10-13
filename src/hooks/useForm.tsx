import { useState } from 'react';

export default function useForm<T = unknown>(initialState: T): [T, (value: T | unknown, field?: string) => void, () => void] {
  const [form, setForm] = useState<T>(initialState);

  const onChange = (value: T | unknown, field?: string, callback?: (value: T) => void) => {
    if (typeof value === 'object' && !field) {
      setForm(prevValue => ({ ...prevValue, ...value }))
    } else if (field && form?.hasOwnProperty(field)) {
      setForm(prevValue => ({ ...prevValue, [field]: value }))
    }

    if (callback) callback(value as T);
  }

  const resetForm = (): void => {
    setForm(initialState);
  }

  return [form, onChange, resetForm];
}