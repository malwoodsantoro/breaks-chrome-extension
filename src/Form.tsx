import React, { useState } from 'react';
import Button from '@mui/material/Button';
import WindowDimensions from './WindowDimensions';
import { createTheme } from '@mui/material/styles';

interface Values {
  name: string,
  minWidth: string
}

type valuesType = Values[];

export default function Form() {

  const [formValues, setFormValues] = useState<valuesType>([{ name: '', minWidth: '' }])

  const onChange = (index: number, e: React.FormEvent<HTMLInputElement>): void => {
    let newFormValues: valuesType = [...formValues];
    const { name, value } = e.currentTarget;
    newFormValues[index][name as keyof Values] = value;
    setFormValues(newFormValues);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    setFormValues(formValues);
    e.preventDefault();
  }

  const addFormFields = () => {
    setFormValues([...formValues, { name: "", minWidth: "" }])
  }

  const removeFormFields = (index: number) => {
    let newFormValues = [...formValues]
    newFormValues.splice(index, 1);
    setFormValues(newFormValues);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            <label>Name</label>
            <input type="text" name="name" value={element.name || ""} onChange={e => onChange(index, e)} />
            <label>Min-width</label>
            <input type="text" name="minWidth" value={element.minWidth || ""} onChange={e => onChange(index, e)} />
            {
              index ?
                <Button variant="outlined" style={{ color: 'red' }} className="button remove" onClick={() => removeFormFields(index)}>Remove</Button>
                : null
            }
          </div>
        ))}
        <div className="button-section">
          <Button variant="text" className="button add" type="button" onClick={() => addFormFields()}>Add</Button>
          <Button variant="outlined" className="button submit" type="submit">Submit</Button>
        </div>
      </form>
      <WindowDimensions values={formValues} />
    </div>
  );
}
