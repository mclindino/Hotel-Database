import React from 'react'
import TextField from '@material-ui/core/TextField';
import AppContext from '../../pages/App/AppContext';

export default function Input(props) {
  const { index } = props;
  return (
    <AppContext.Consumer> 
      {({
        updateInputText, inputText
      }) => (
        <TextField
          label="Nome"
          margin="normal"
          value={inputText[index]}
          onChange={(event) => updateInputText(event, index)}
        />
      )}
    </AppContext.Consumer>
  )
}
