import React from 'react';
import AppContext from '../App/AppContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Inputs = (tableColumns, updateInputText, inputText) => {
  const array = [];
  tableColumns.forEach((column) => {
    array.push(
      <TextField
        style={{margin: '10px'}}
        label={column.field}
        margin="normal"
        value={inputText[column.field]}
        onChange={(event) => updateInputText(event, column.field)}
      />
    )
  })
  return array;
}


const PageInputs = () => ( 
  <AppContext.Consumer>
    {({
      tableColumns, updateInputText, inputText
    }) => (
      Inputs(tableColumns, updateInputText, inputText)
    )}
  </AppContext.Consumer>
);



const Insert = () => (
  <AppContext.Consumer>
    {({
      updateCurrentPage, insertData
    }) => (
      <div>
        <PageInputs />
        <div>
          <Button
            style={{margin: '10px 10px 10px 0px'}}
            color="primary"
            variant="contained"
            onClick={() => updateCurrentPage('home')}
          >
            Voltar
          </Button>
          <Button 
            style={{margin: '10px 10px 10px 0px'}}
            color="primary"
            variant="contained"
            onClick={() => insertData()}
          >
            Inserir
          </Button>
        </div>
      </div>
    )}
  </AppContext.Consumer>
)





export default Insert;