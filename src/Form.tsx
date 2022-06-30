import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

interface Values {
  name: string,
  minWidth: string,
  maxWidth: string
}

type valuesType = Values[];

export default function Form() {

  const [formValues, setFormValues] = useState<valuesType>([{ name: 'small', minWidth: '640', maxWidth: '767' }, { name: 'medium', minWidth: '768', maxWidth: '1023' }, { name: 'large', minWidth: '1024', maxWidth: '1279' }, { name: 'x-large', minWidth: '1279', maxWidth: '1535' }, { name: '2x-large', minWidth: '1536', maxWidth: '2000' }])
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    chrome.storage.local.set({ data: formValues }, () => {
      console.log('Set formValues in useEffect!')
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id!, { disabled: disabled }, function () {
        chrome.storage.local.set({ disabled: disabled }, () => {
          console.log('Set disabled in useEffect!')
        });
      });
    });
  }, [disabled]);

  const onChange = (index: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    let newFormValues: valuesType = [...formValues];
    const { name, value } = e.currentTarget;
    newFormValues[index][name as keyof Values] = value;
    setFormValues(newFormValues);
  };

  const handleCheck = () => {
    setDisabled(!disabled);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    chrome.storage.local.set({ data: formValues }, () => {
      console.log('set storage!')
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
    <div style={{backgroundColor: disabled ? "#C5C5C5" : "#fff"}}>
      <Box m={6} pt={2} sx={{ width: 450 }}>
        <form onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <Box display="flex">
                <TextField name="name" sx={{ width: '15ch', marginRight: 4}} id="name" value={element.name || ""} label="Name" variant="standard" onChange={e => onChange(index, e)} />
                <TextField name="minWidth" sx={{ width: '10ch', marginRight: 2 }} id="minWidth" value={element.minWidth || ""} label="Min-width" variant="standard" onChange={e => onChange(index, e)} InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment>, }} />
                <TextField name="maxWidth" sx={{ width: '10ch', marginRight: 2 }} id="maxWidth" value={element.maxWidth || ""} label="Max-width" variant="standard" onChange={e => onChange(index, e)} InputProps={{ endAdornment: <InputAdornment position="end">px</InputAdornment>, }} />
                {
                  index ?
                    <Button variant="text" startIcon={<DeleteIcon />} style={{ color: '#50a2f4' }} className="button remove" onClick={() => removeFormFields(index)}></Button>
                    : null
                }
              </Box>
            </div>
          ))}
          <Button variant="text" className="button add" type="button" onClick={() => addFormFields()}>+ Add Row</Button>
          <Typography align='center'>
            <Button variant="contained" className="button submit" sx={{ backgroundColor: "#00bfff" }} type="submit">Submit</Button>
          </Typography>
        </form>
        <Box display="flex" flexDirection="row" alignItems="center" padding={1}>
          <div>{disabled ? "Enable plugin" : "Disable plugin"}</div>
          <Switch
            checked={!disabled}
            onChange={handleCheck}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
      </Box >
    </div >
  );
}
