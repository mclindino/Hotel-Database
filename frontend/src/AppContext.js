import React from 'react';

const AppContext = React.createContext({
  selectedUser: '',
  users: [],
  updateSelectedUser: () => { },
});

export default AppContext;
