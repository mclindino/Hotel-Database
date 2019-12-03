import React, { Component } from 'react';
import axios from 'axios';
import AppContext from './AppContext';
import Home from '../Home/Home';
import Insert from '../Insert/Insert';

const gerenteTables = [
  'ABASTECE', 'CAMAREIRA', 'CLIENTE', 'COMUNICA',
  'EVENTO', 'FORNECE', 'FORNECEDOR', 'FUNCIONARIO',
  'GERENTE', 'HOTEL', 'LIMPA', 'PRODUTO', 'QUARTO',
  'RECEPCIONISTA', 'RESERVA'
];

const recepcionistaTables = ['CLIENTE', 'RESERVA', 'QUARTO'];

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedUser: 'Recepcionista',
      users: ['Recepcionista', 'Gerente'],
      tables: ['CLIENTE', 'RESERVA', 'QUARTO'],
      currentTable: 'CLIENTE',
      tableColumns: [],
      tableData: [],
      inputText: {},
      currentPage: 'home',
      disableInsert: false,
      disableDelete: true,
      disableUpdate: true,
    }

    this.updateSelectedUser = (event) => {
      let { currentTable } = this.state;

      if (event.target.value === 'Recepcionista') {
        currentTable = recepcionistaTables.includes(currentTable) ? currentTable : recepcionistaTables[0]
        this.populateTable(currentTable);
        this.setState({
          selectedUser: event.target.value,
          tables: recepcionistaTables,
          currentTable,
        })
        if (currentTable === 'CLIENTE' || currentTable === 'RESERVA') {
          this.setState({
            disableInsert: false,
          })
        } else {
          this.setState({
            disableInsert: true,
          })
        }
      } else {
        this.populateTable(currentTable);
        this.setState({
          selectedUser: event.target.value,
          tables: gerenteTables,
        })
      }
    };

    this.updateCurrentTable = (event) => {
      this.populateTable(event.target.value);
      this.setState({
        currentTable: event.target.value,
      })
      if (event.target.value === 'CLIENTE' || event.target.value === 'RESERVA') {
        this.setState({
          disableInsert: false,
        })
      } else {
        this.setState({
          disableInsert: true,
        })
      }
    }

    this.updateCurrentPage = (currentPage) => {
      this.setState({
        currentPage,
      })
    }

    this.populateTable = (currentTable) => {
      const tableData = [];
      const tableColumns = [];

      axios.get(`http://0.0.0.0:5000/${currentTable}`, {
        params: {},
      }).then((resData) => {
        const receivedData = resData.data;
        const keys = Object.keys(receivedData);

        keys.forEach((key) => {
          tableData.push(receivedData[key]);
        });

        Object.keys(receivedData[keys[0]]).forEach((key) => {
          tableColumns.push({
            'title': key,
            'field': key,
          });
        });

        this.setState({
          tableColumns,
          tableData,
        })
      });
    }

    this.updateInputText = (event, index) => {
      const { inputText } = this.state;
      inputText[index] = event.target.value;
      this.setState({
        inputText,
      })
    }

    this.updateSelectedRows = (event) => {
      const { currentTable } = this.state;
      if ((event.length > 0) && ((currentTable === 'CLIENTE') || (currentTable === 'RESERVA'))) {
        this.setState({
          selectedRows: event,
          disableDelete: false,
        })
        if (currentTable !== 'RESERVA') {
          this.setState({
            disableUpdate: true,
          });
        }
        else{
          this.setState({
            disableUpdate: false,
          });
        }
      } else {
        this.setState({
          selectedRows: event,
          disableDelete: true,
          disableUpdate: true,
        })
      }
    }

    this.insertData = () => {
      const { currentTable, tableColumns, inputText } = this.state
      const data = {};
      tableColumns.forEach((column) => {
        data[column.field] = inputText[column.field];
      });
      axios.put(`http://0.0.0.0:5000/${currentTable}`, { data: data })
        .then(() => {
          this.populateTable(currentTable);
          this.setState({
            currentPage: 'home',
            inputText: {},
            disableDelete: true,
            disableUpdate: true,

          })
        });
    }

    this.deleteData = () => {
      const { currentTable, selectedRows } = this.state
      selectedRows.forEach((elem) => {
        axios.post(`http://0.0.0.0:5000/${currentTable}`, { data: elem, action: 'delete' })
          .then(() => {
            this.populateTable(currentTable);
            this.setState({
              disableDelete: true,
              disableUpdate: true,
            })
          });
      })
    }

    this.updateData = () => {
      const { currentTable, selectedRows } = this.state
      selectedRows.forEach((elem) => {
        axios.post(`http://0.0.0.0:5000/${currentTable}`, { data: elem, action: 'update' })
          .then(() => {
            this.populateTable(currentTable);
            this.setState({
              disableDelete: true,
              disableUpdate: true,
            })
          });
      })
    }
  }

  componentDidMount() {
    const { currentTable } = this.state;
    this.populateTable(currentTable);
  }

  render() {
    const { currentPage } = this.state;
    const {
      updateSelectedUser,
      updateCurrentTable,
      updateInputText,
      updateCurrentPage,
      insertData,
      updateSelectedRows,
      deleteData,
      updateData,
    } = this;
    const contextValue = {
      ...this.state,
      updateSelectedUser,
      updateCurrentTable,
      updateInputText,
      updateCurrentPage,
      insertData,
      updateSelectedRows,
      deleteData,
      updateData,
    }

    return (
      <div style={{ margin: '30px 10px 0px 10px' }}>
        <AppContext.Provider value={contextValue}>
          {currentPage === 'home' ? <Home /> : currentPage === 'insert' ? <Insert /> : null}
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
