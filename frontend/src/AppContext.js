import React from 'react';

const AppContext = React.createContext({
  selectedUser: '',
  users: [],
  tables: [],
  currentTable: '',
  tableColumns: [],
  tableData: [],
  updateSelectedUser: () => { },
  updateCurrentTable: () => { },
});

export default AppContext;
