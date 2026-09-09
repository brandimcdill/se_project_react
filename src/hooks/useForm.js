import { useEffect, useState } from "react";

export function useForm(initialValues, isOpen) {

  const [values, setValues] = useState(initialValues);

 

  useEffect(() => {
    if (isOpen) {
      setValues(initialValues);
    }
  }, [isOpen]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
