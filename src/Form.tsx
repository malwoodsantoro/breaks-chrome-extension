import React, {useState} from 'react';

interface Values {
  name: string,
  minWidth: string,
  maxWidth: string
}

type valuesType = Values[];

export default function Form() {

  const [formValues, setFormValues] = useState<valuesType>([{name: '', minWidth: '', maxWidth: ''}])

  const onChange = (index: number, e: React.FormEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.value)
    let newFormValues: valuesType = [...formValues];
    const {name, value} = e.currentTarget;
    newFormValues[index][name as keyof Values] = value;
    setFormValues(newFormValues);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    alert(JSON.stringify(formValues));
    e.preventDefault();
  }

  const addFormFields = () => {
    setFormValues([...formValues, { name: "", minWidth: "", maxWidth: "" }])
  }

  const removeFormFields = (index: number) => {
    let newFormValues = formValues.splice(index, 1);
    setFormValues(newFormValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>Name</label>
          <input type="text" name="name" value={element.name || ""} onChange={e => onChange(index, e)} />
          <label>Min-width</label>
          <input type="text" name="minWidth" value={element.minWidth || ""} onChange={e => onChange(index, e)} />
          <label>Max-width</label>
          <input type="text" name="maxWidth" value={element.maxWidth || ""} onChange={e => onChange(index, e)} />
          {
            index ? 
              <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
            : null
          }
        </div>
      ))}
      <div className="button-section">
          <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
          <button className="button submit" type="submit">Submit</button>
      </div>
  </form>
);
}
