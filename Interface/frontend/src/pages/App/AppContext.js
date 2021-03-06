import React from 'react';

const AppContext = React.createContext({
  selectedUser: '',
  users: [],
  tables: [],
  currentTable: '',
  tableColumns: [],
  tableData: [],
  inputText: [],
  updateSelectedUser: () => { },
  updateCurrentTable: () => { },
  updateInputText: () => { },
  updateCurrentPage: () => { },
  insertData: () => { },
});

export default AppContext;

