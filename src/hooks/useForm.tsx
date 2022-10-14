import { useState } from 'react';


type UseFormType<T> = [T, <C>(field: string, value: C) => void, () => void, (value: T) => void]

export default function useForm<T = unknown>(initialState: T): UseFormType<T> {
  const [form, setForm] = useState<T>(initialState);

  function onChange<C>(field: string, value: C): void {
    setForm(prev => ({ ...prev, [field]: value }),)
  }

  function onChangeBulk(value: T): void {
    setForm(prev => ({ ...prev, ...value }))
  }

  function resetForm(): void {
    setForm(initialState);
  }

  return [form, onChange, resetForm, onChangeBulk];
}