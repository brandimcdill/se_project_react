import { useEffect, useState, useMemo } from "react";

export function useForm(isOpen) {
  const memoizedValue = useMemo(() => {
    const defaultValues = { name: "", imageUrl: "", weather: "" };
    return defaultValues;
  }, []);

  const [values, setValues] = useState(memoizedValue);
  useEffect(() => {
    const resetForm = () => {
      setValues(memoizedValue);
    };
    resetForm();
  }, [isOpen, memoizedValue]);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { memoizedValue, values, handleChange, setValues };
}
