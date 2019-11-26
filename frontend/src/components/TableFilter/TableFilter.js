import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import useStyles from './styles';
import AppContext from '../../pages/App/AppContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, label, theme) {
  return {
    fontWeight:
      label.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TableFilter() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <AppContext.Consumer> 
      {({
        tables, currentTable, updateCurrentTable
      }) => (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">Tabela</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            value={currentTable}
            onChange={updateCurrentTable}
            input={<Input id="select-multiple-chip" />}
            MenuProps={MenuProps}
          >
            {tables.map((label) => (
              <MenuItem key={label} value={label} style={getStyles(label, currentTable, theme)}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </AppContext.Consumer>
  );
}