import _ from '@lodash';
import { useCallback, useState } from 'react';

function useForm(initialState, onSubmit) {
  const [form, setForm] = useState(initialState);
  // console.log(form, 'aaa')

  const handleChange = useCallback((event) => {
    event.persist();
    // console.log(event, 'e');
    if (event.target.name === 'part_no') {
      if (event.target.value.length === 11) {
        return;
      }
    }
    setForm((_form) =>
      _.setIn(
        { ..._form },
        event.target.name,
        event.target.type === 'checkbox' ? event.target.checked : event.target.value
      )
    );
  }, []);

  const resetForm = useCallback(() => {
    if (!_.isEqual(initialState, form)) {
      setForm(initialState);
    }
  }, [form, initialState]);

  const setInForm = useCallback((name, value) => {
    setForm((_form) => _.setIn(_form, name, value));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      if (event) {
        event.preventDefault();
      }
      if (onSubmit) {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return {
    form,
    handleChange,
    handleSubmit,
    resetForm,
    setForm,
    setInForm,
  };
}

export default useForm;
