import { useEffect, useState } from "react";

export function useForm(defaultValues, isOpen) {
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    const resetForm = () => {
      setValues(defaultValues);
    };
    resetForm();
  }, [isOpen]);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
