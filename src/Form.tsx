import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import WindowDimensions from './WindowDimensions';
import { createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

interface Values {
  name: string,
  minWidth: string,
  maxWidth: string
}

type valuesType = Values[];

export default function Form() {

  const [formValues, setFormValues] = useState<valuesType>([{ name: 'small', minWidth: '640', maxWidth: '767' }, { name: 'medium', minWidth: '768', maxWidth: '1023' }, { name: 'large', minWidth: '1024', maxWidth: '1279' }, { name: 'x-large', minWidth: '1279', maxWidth: '1535' }, { name: '2x-large', minWidth: '1536', maxWidth: '2000' }])

  useEffect(() => {
    chrome.storage.local.set({ data: formValues }, () => {
      chrome.tabs.getCurrent((currentTab: any) => {
        chrome.tabs.sendMessage(
          currentTab.id,
          {
            message: "Generic Message",
          },
          function () { }
        );
      });
    });
  }, []);

  const onChange = (index: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    let newFormValues: valuesType = [...formValues];
    const { name, value } = e.currentTarget;
    newFormValues[index][name as keyof Values] = value;
    setFormValues(newFormValues);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    chrome.storage.local.set({ data: formValues }, () => {
      alert('set storage!')
    });
    setFormValues(formValues);
    e.preventDefault();
  }

  const addFormFields = () => {
    setFormValues([...formValues, { name: "", minWidth: "", maxWidth: "" }])
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
            <TextField name="name" id="name" value={element.name || ""} label="Name" variant="standard" onChange={e => onChange(index, e)} />
            <TextField name="minWidth" id="minWidth" value={element.minWidth || ""} label="Min-width" variant="standard" onChange={e => onChange(index, e)} />
            <TextField name="maxWidth" id="maxWidth" value={element.maxWidth || ""} label="Max-width" variant="standard" onChange={e => onChange(index, e)} />
            {
              index ?
                <Button variant="outlined" style={{ color: 'red' }} className="button remove" onClick={() => removeFormFields(index)}>Remove</Button>
                : null
            }
          </div>
        ))}
        <div className="button-section">
          <Button variant="text" className="button add" type="button" onClick={() => addFormFields()}>Add Row</Button>
          <Button variant="outlined" className="button submit" type="submit">Submit</Button>
        </div>
      </form>
      <WindowDimensions values={formValues} />
    </div>
  );
}
